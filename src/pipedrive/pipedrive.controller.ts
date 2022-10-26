import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    ServiceUnavailableException,
    Param,
    Query
} from '@nestjs/common';
import {PipedriveService} from './pipedrive.service';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {AuthGuard} from "../auth";
import {ApiForbiddenResponse, ApiHeader, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CreateHumanPipedriveResponse} from "./entities/create-human-pipedrive-response";
import {forbiddenResponse} from "../user-info/entities/types";
import {getAllPersonsPipedriveResponse} from "./entities/get-all-persons-pipedrive-response";
import {createLeadPipedriveResponse} from "./entities/create-lead-pipedrive-response";
import {FindPersonsPipedriveResponse} from "./entities/find-persons-pipedrive-response";
import {UserIdQueryParamGuard} from "./user-id-query-param.guard";
import {IsApiKeyValid} from "./entities/is-api-key-valid";
import {ApiKeyNotFoundErrorResponse} from "./entities/api-key-not-found-error-response";


@ApiHeader({
    name: 'access-key',
    description: 'Access key to enter API',
    required: true,
})
@ApiForbiddenResponse({description: 'Access key is not valid', type: forbiddenResponse})
@ApiTags('Interacting with Pipedrive')
@Controller('pipedrive')
@UseGuards(AuthGuard, UserIdQueryParamGuard)
export class PipedriveController {
    constructor(private readonly pipedriveService: PipedriveService) {
    }

    @ApiOkResponse({
        description: 'Returns true if the pipedrive api key is valid, false - if not.',
        type: IsApiKeyValid,
    })
    @Get("/isApiKeyValid")
    async validatePipedriveApiKey(@Query() query: { mmUID: string }): Promise<IsApiKeyValid> {
        return this.pipedriveService.validatePipedriveApiKey(query);
    }

    @ApiOkResponse({
        description: 'Creates a person in PipeDrive database and returns created user.',
        type: CreateHumanPipedriveResponse
    })
    @Post("/persons")
    async createPerson(@Body() dto: CreatePipedrivePersonDto, @Query() query: { mmUID: string }):  Promise<CreateHumanPipedriveResponse | ApiKeyNotFoundErrorResponse> {
        return this.pipedriveService.createPerson(query, dto);
    }


    @ApiOkResponse({description: "Gets all users from the system.", type: getAllPersonsPipedriveResponse})
    @Get("/persons")
    async findAllPersons(@Query() query: { mmUID: string }):Promise<getAllPersonsPipedriveResponse | ApiKeyNotFoundErrorResponse>{
        return this.pipedriveService.findAllPersons(query);
    }


    @ApiOkResponse({
        description: "Gets all users from the system based on given search term.",
        type: FindPersonsPipedriveResponse
    })
    @Get("persons/find/:term")
    async findPersonsByTerm(@Param("term") term: string, @Query() query: { mmUID: string }): Promise<any> {
        return this.pipedriveService.findPersonsByTerm(query, term);
    }


    @ApiOkResponse({
        description: "Create a person in pipedrive persons database, and then create lead with given title and attach newly created person to this lead.",
        type: createLeadPipedriveResponse
    })
    @Post("/leads")
    async createLead(@Body() dto: CreatePipedriveLeadDto, @Query() query: { mmUID: string }): Promise<createLeadPipedriveResponse | ApiKeyNotFoundErrorResponse> {
        return this.pipedriveService.createLead(query, dto);
    }


    @ApiOkResponse({
        description: "A method to validate data submission from component form.",
        type: createLeadPipedriveResponse
    })
    @Post("/validateClientForm")
    async processFormFromClient(@Body() dto: (CreatePipedrivePersonDto & CreatePipedriveLeadDto), @Query() query: { mmUID: string }): Promise<createLeadPipedriveResponse | ServiceUnavailableException | ApiKeyNotFoundErrorResponse> {
        return this.pipedriveService.processFormFromClient(query, dto);
    }
}
