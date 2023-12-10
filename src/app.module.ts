import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { auth0, cryptojs, firebase, sendgrid } from 'configurations/env.config';
import { CourseModule } from 'modules/course/course.module';
import { Auth0Module, Auth0ModuleOptions } from 'utils/auth0';
import { PrismaModule } from 'utils/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [auth0, sendgrid, cryptojs, firebase],
    }),
    Auth0Module.forRootAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        const auth0Options = configService.get<Auth0ModuleOptions>('auth0');
        return auth0Options;
      },
      inject: [ConfigService],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    CourseModule,
  ],
})
export class AppModule {}
