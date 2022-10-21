import {IsEmail, IsNotEmpty, IsString, IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePipedrivePersonDto {
    @ApiProperty({
        description: "Email of person to be created in Pipedrive persons database",
        example: "mail@example.com",
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Name of person to be created in Pipedrive persons database",
        example: "John Galt",
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "Phone of person to be created in Pipedrive persons database",
        example: "41040283535",
    })
    @IsNotEmpty()
    @IsString()
    phone: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "A 'Position' custom field that represents current job position of a person to be added.",
        example: "Senior Software Engineer",
    })
    position: string;


    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        description: "A 'LinkedIn' custom field that represents LinkedIn url of a person to be added.",
        example: "Senior Software Engineer",
    })
    LinkedIn: string;
}
