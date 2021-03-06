import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}