import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(options: { isGlobal?: boolean }): DynamicModule {
    return {
      module: PrismaModule,
      global: options.isGlobal,
    };
  }
}
