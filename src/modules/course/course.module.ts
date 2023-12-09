import { Module } from '@nestjs/common';
import {
  CourseAdminController,
  CourseController,
  CourseInvitationController,
} from './controllers';
import {
  CourseService,
  ICourseService,
  IInvitationService,
  InvitationService,
} from './services';
import { SendgridModule } from 'utils/sendgrid/sendgrid.module';
import { ConfigService } from '@nestjs/config';
import { SendgridModuleOptions } from 'utils/sendgrid';
import { CryptoJSModule, CryptoJSModuleOptions } from 'utils/hash/cryptojs';

@Module({
  imports: [
    SendgridModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const sendgirdOptions =
          configService.get<SendgridModuleOptions>('sendgrid');
        return sendgirdOptions;
      },
      inject: [ConfigService],
    }),

    CryptoJSModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const sendgirdOptions =
          configService.get<CryptoJSModuleOptions>('cryptojs');
        return sendgirdOptions;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [
    CourseController,
    CourseAdminController,
    CourseInvitationController,
  ],
  providers: [
    {
      provide: ICourseService,
      useClass: CourseService,
    },
    {
      provide: IInvitationService,
      useClass: InvitationService,
    },
  ],
})
export class CourseModule {}
