import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { EnvModule } from 'src/config/config.module';
import { EnvService } from 'src/config/config.service';

@Module({
  imports: [
    EnvModule,
    GuardModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('ACCESS_SECRET'),
        signOptions: {
          expiresIn: envService.get('ACCESS_TIME'),
        },
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('REFRESH_SECRET'),
        signOptions: {
          expiresIn: envService.get('REFRESH_TIME'),
        },
      }),
    }),
  ],
  providers: [GuardService, TokenService],
  exports: [GuardService, TokenService],
})
export class GuardModule {}
