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

@Module({
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
