import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtJwtStrategy, RtJwtStrategy } from './strategies';

@Module({
  providers: [AuthService, AtJwtStrategy, RtJwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
