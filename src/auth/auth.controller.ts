import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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

    @Post('logout')
    logout() {
        // return this.authService.logout()
    }

    @Post('refresh')
    refreshTokens() {
        this.authService.refreshTokens()
    }

}
