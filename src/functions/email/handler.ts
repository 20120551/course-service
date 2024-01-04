import BPromise from 'bluebird';
import { SQSEvent } from 'aws-lambda';
import { isEmpty } from 'lodash';
import { BatchInvitationResponse } from 'modules/course/resources/response/invitation.response';
import { bootstrapSQS } from '../../bootstrap';
import { LazyModuleLoader } from '@nestjs/core';
import { CryptoJSModule, ICryptoJSService } from 'utils/hash/cryptojs';
import { ISendgridService, SendgridModule } from 'utils/sendgrid';
import * as invitationTemplate from 'templates/invitation.html';

const parseEventBody = <T>(payload) => {
  if (typeof payload === 'string') {
    return JSON.parse(payload) as T;
  }
  return payload as T;
};

export const handler = async (event: SQSEvent) => {
  const invitations = parseEventBody<BatchInvitationResponse[]>(
    event.Records[0].body,
  );

  if (!invitations || isEmpty(invitations)) {
    console.info('not have invitations to invite');
    return 'Ok';
  }

  // setup
  const app = await bootstrapSQS();
  const lazyLoadingModule = app.get(LazyModuleLoader);
  const cryptoJSModule = await lazyLoadingModule.load(() => CryptoJSModule);
  const cryptoJSService =
    cryptoJSModule.get<ICryptoJSService>(ICryptoJSService);
  const sendGridModule = await lazyLoadingModule.load(() => SendgridModule);
  const sendGridService =
    sendGridModule.get<ISendgridService>(ISendgridService);

  await BPromise.map(
    invitations,
    async (invitation) => {
      const encrypt = cryptoJSService.encrypt({
        id: invitation.id,
      });

      const url = `${process.env.FE_BASE_URL}/course/attendee?token=${encrypt}`;
      const formatHtml = invitationTemplate.default
        .replaceAll('{{name}}', invitation.email)
        .replaceAll('{{action_url}}', url)
        .replaceAll('{{invite_sender_name}}', 'HPCLASS')
        .replaceAll('{{invite_sender_organization_name}}', 'HCMUS')
        .replaceAll('[Product Name]', 'HPCLASS');

      await sendGridService.send({
        to: invitation.email,
        subject: `Invitation to course by ${invitation.name} with role ${invitation.role}`,
        from: '20120551@student.hcmus.edu.vn', // Fill it with your validated email on SendGrid account
        text: 'Hello',
        html: formatHtml,
      });

      console.info('sending success');
    },
    { concurrency: 10 },
  );

  return 'Ok';
};
