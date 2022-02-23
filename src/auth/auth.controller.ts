import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('/local/signup')
    signUpLocal() {

    }

    @Post('/local/signin')
    signInLocal() {
        
    }

    @Post('/logout')
    logout() {
        
    }

    @Post('/refresh')
    refreshTokens() {
        
    }

}
