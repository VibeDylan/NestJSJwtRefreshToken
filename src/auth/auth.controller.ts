import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getCurrentUser, getCurrentUserId, Public } from 'src/common/decorator';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUpLocal(dto)
    }

    @Public()
    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signInLocal(dto)
    }
    
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@getCurrentUserId() userId: number) {
        return this.authService.logout(userId);
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@getCurrentUserId() userId: number, @getCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshTokens(userId, refreshToken);
    }

}
