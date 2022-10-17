import {IsNotEmpty, IsString} from "class-validator";

export class AddApiTokenDto {
    @IsNotEmpty()
    @IsString()
    mattermostUserId: string;

    @IsNotEmpty()
    @IsString()
    pipedriveApiKey: string;
}