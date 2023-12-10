import { Module } from '@nestjs/common';
import {
  CourseAdminController,
  CourseAttendeeController,
  CourseController,
  CourseInvitationController,
} from './controllers';
import {
  AttendeeService,
  CourseService,
  IAttendeeService,
  ICourseService,
  IInvitationService,
  InvitationService,
} from './services';
import { SendgridModule } from 'utils/sendgrid/sendgrid.module';
import { ConfigService } from '@nestjs/config';
import { SendgridModuleOptions } from 'utils/sendgrid';
import { CryptoJSModule, CryptoJSModuleOptions } from 'utils/hash/cryptojs';
import { FirebaseModule, FirebaseModuleOptions } from 'utils/firebase';

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

    FirebaseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const firebase = configService.get<FirebaseModuleOptions>('firebase');
        return firebase;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [
    CourseController,
    CourseAdminController,
    CourseInvitationController,
    CourseAttendeeController,
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
    {
      provide: IAttendeeService,
      useClass: AttendeeService,
    },
  ],
})
export class CourseModule {}
