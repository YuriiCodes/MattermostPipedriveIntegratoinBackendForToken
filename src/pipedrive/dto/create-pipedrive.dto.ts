import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreatePipedriveDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
