import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {PipedriveService} from './pipedrive.service';
import {CreatePipedriveDto} from './dto/create-pipedrive.dto';

@Controller('pipedrive')
export class PipedriveController {
    constructor(private readonly pipedriveService: PipedriveService) {
    }

    @Post("/persons")
    createPerson(@Body() dto: CreatePipedriveDto) {
        return this.pipedriveService.createPerson(dto);
    }

    @Get("/persons")
    findAllPersons() {
        return this.pipedriveService.findAllPersons();
    }

    @Post("/leads")
    createLead(@Body() dto: CreatePipedriveDto) {
        return this.pipedriveService.createLead(dto);

    }

}
