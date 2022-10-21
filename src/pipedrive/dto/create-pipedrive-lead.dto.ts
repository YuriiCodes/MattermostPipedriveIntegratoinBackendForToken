import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePipedriveLeadDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Id of person in pipedrive persons database. This person will be attached to the lead.",
        example: "1",
    })
    person_id: number;

    @ApiProperty({
        description: "A title of lead to be created in Pipedrive leads database",
        example: "Deal with Microsoft",
    })
    @IsNotEmpty()
    @IsString()
    lead_name: string;
}
