import {ApiProperty} from "@nestjs/swagger";

export class IsApiKeyValid {
    @ApiProperty()
    isValid: boolean;
}
