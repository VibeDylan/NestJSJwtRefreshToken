import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { getCurrentUser, getCurrentUserId, Public } from 'src/common/decorator';
import { RtGuard } from 'src/common/guards';
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

    @Public()
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@getCurrentUserId() userId: number) {
        return this.authService.logout(userId);
    }

    @Public() // for bypass first 
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@getCurrentUserId() userId: number, @getCurrentUser('refreshToken') refreshToken: string) {
        console.log(refreshToken)
        return this.authService.refreshTokens(userId['sub'], refreshToken);
    }

    @Public()
    @Get('user')
    getUser(@getCurrentUser() userId: number) {
        return this.authService.getUser(userId);
    }

}
