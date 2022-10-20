import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {PipedriveService} from './pipedrive.service';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {AuthGuard} from "../auth";
import {ApiHeader, ApiTags} from "@nestjs/swagger";

@ApiHeader({
    name: 'access-key',
    description: 'Access key to enter API',
    required: true,
})
@ApiTags('Interacting with Pipedrive')
@Controller('pipedrive')
@UseGuards(AuthGuard)
export class PipedriveController {
    constructor(private readonly pipedriveService: PipedriveService) {}

    @Post("/persons")
    createPerson(@Body() dto: CreatePipedrivePersonDto) {
        return this.pipedriveService.createPerson(dto);
    }

    @Get("/persons")
    findAllPersons() {
        return this.pipedriveService.findAllPersons();
    }

    @Post("/leads")
    createLead(@Body() dto: CreatePipedriveLeadDto) {
        return this.pipedriveService.createLead(dto);
    }

}
