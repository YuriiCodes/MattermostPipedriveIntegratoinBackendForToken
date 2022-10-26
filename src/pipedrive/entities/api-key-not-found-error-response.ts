import {ApiProperty} from "@nestjs/swagger";

export class ApiKeyNotFoundErrorResponse {
    @ApiProperty()
    success: boolean;
    @ApiProperty()
    error: string
}