import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/config/config.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private envService: EnvService,
  ) {}

  createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.envService.get('ACCESS_SECRET'),
      expiresIn: this.envService.get('ACCESS_TIME'),
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.envService.get('REFRESH_SECRET'),
      expiresIn: this.envService.get('REFRESH_TIME'),
    });
  }
}
