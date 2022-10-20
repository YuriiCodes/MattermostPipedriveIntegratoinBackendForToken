import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePipedriveLeadDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: "Email of person to be created in Pipedrive persons database. This person will be than associated with created lead.",
        example: "mail@example.com",
    })
    email: string;


    @ApiProperty({
        description: "Name of person to be created in Pipedrive persons database. This person will be than associated with created lead.",
        example: "John Galt",
    })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({
        description: "Phone of person to be created in Pipedrive persons database. This person will be than associated with created lead.",
        example: "41040283535",
    })
    @IsNotEmpty()
    @IsString()
    phone: string;


    @ApiProperty({
        description: "A title of lead to be created in Pipedrive leads database",
        example: "Deal with Microsoft",
    })
    @IsNotEmpty()
    @IsString()
    lead_name: string;
}
