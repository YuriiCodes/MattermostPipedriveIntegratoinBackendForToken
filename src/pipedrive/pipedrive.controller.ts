import {Controller, Get, Post, Body, UseGuards, ServiceUnavailableException} from '@nestjs/common';
import {PipedriveService} from './pipedrive.service';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {AuthGuard} from "../auth";
import {ApiForbiddenResponse, ApiHeader, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CreateHumanPipedriveResponse} from "./entities/create-human-pipedrive-response";
import {forbiddenResponse} from "../user-info/entities/types";
import {getAllPersonsPipedriveResponse} from "./entities/get-all-persons-pipedrive-response";
import {createLeadPipedriveResponse} from "./entities/create-lead-pipedrive-response";

@ApiHeader({
    name: 'access-key',
    description: 'Access key to enter API',
    required: true,
})

@ApiForbiddenResponse({description: 'Access key is not valid', type: forbiddenResponse})
@ApiTags('Interacting with Pipedrive')
@Controller('pipedrive')
@UseGuards(AuthGuard)
export class PipedriveController {
    constructor(private readonly pipedriveService: PipedriveService) {}

    @ApiOkResponse({description: 'Creates a person in PipeDrive database and returns created user.',  type: CreateHumanPipedriveResponse})
    @Post("/persons")
    createPerson(@Body() dto: CreatePipedrivePersonDto):Promise<CreateHumanPipedriveResponse> {
        return this.pipedriveService.createPerson(dto);
    }

    @ApiOkResponse({description:"Gets all users from the system.", type: getAllPersonsPipedriveResponse})
    @Get("/persons")
    findAllPersons():Promise<getAllPersonsPipedriveResponse> {
        return this.pipedriveService.findAllPersons();
    }

    @ApiOkResponse({description:"Create a person in pipedrive persons database, and then create lead with given title and attach newly created person to this lead.", type: createLeadPipedriveResponse})
    @Post("/leads")
    createLead(@Body() dto: CreatePipedriveLeadDto):Promise<createLeadPipedriveResponse> {
        return this.pipedriveService.createLead(dto);
    }
    @ApiOkResponse({description:"A method to validate data submission from component form.", type: createLeadPipedriveResponse})
    @Post("/validateClientForm")
    processFormFromClient(@Body() dto: (CreatePipedrivePersonDto & CreatePipedriveLeadDto)): Promise<createLeadPipedriveResponse | ServiceUnavailableException> {
        return this.pipedriveService.processFormFromClient(dto);
    }
}
