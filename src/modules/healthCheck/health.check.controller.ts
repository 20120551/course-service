import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthcheckController {
  @Get()
  get() {
    return 'test healtch check';
  }
}
