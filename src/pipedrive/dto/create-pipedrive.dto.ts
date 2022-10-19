import {IsNotEmpty, IsString} from "class-validator";

export class CreatePipedriveDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
