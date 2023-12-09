import { Module } from '@nestjs/common';
import { CourseController } from './controllers';
import { CourseService, ICourseService } from './services';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: ICourseService,
      useClass: CourseService,
    },
  ],
})
export class CourseModule {}
