import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';

@Module({
  imports: [GuardModule],
  providers: [GuardService],
  exports: [GuardService],
})
export class GuardModule {}
