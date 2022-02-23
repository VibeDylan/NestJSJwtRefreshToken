import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUpLocal(dto)
    }

    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signInLocal(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout() {
        // return this.authService.logout()
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens() {
        this.authService.refreshTokens()
    }

}
