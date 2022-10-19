import {IsNotEmpty, IsString} from "class-validator";

export class CreatePipedriveLeadDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    lead_name: string;
}
