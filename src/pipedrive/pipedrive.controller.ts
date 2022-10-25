import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    ServiceUnavailableException,
    Param,
    Query,
    NotFoundException
} from '@nestjs/common';
import {PipedriveService} from './pipedrive.service';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {AuthGuard} from "../auth";
import {ApiForbiddenResponse, ApiHeader, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CreateHumanPipedriveResponse} from "./entities/create-human-pipedrive-response";
import {forbiddenResponse, userInfoResponse} from "../user-info/entities/types";
import {getAllPersonsPipedriveResponse} from "./entities/get-all-persons-pipedrive-response";
import {createLeadPipedriveResponse} from "./entities/create-lead-pipedrive-response";
import {FindPersonsPipedriveResponse} from "./entities/find-persons-pipedrive-response";
import {UserInfoModule} from "../user-info/user-info.module";
import {UserInfoService} from "../user-info/user-info.service";




const API_TOKEN = "9c1ba905eeccc08eb6df0f4397b90aa7f85a6172";

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
    constructor(private readonly pipedriveService: PipedriveService, private userService: UserInfoService) {
    }

    @ApiOkResponse({
        description: 'Creates a person in PipeDrive database and returns created user.',
        type: CreateHumanPipedriveResponse
    })
    @Post("/persons")
    async createPerson(@Body() dto: CreatePipedrivePersonDto,  @Query() query: { mmUID: string }): Promise<CreateHumanPipedriveResponse | any> {

        if (!query.hasOwnProperty("mmUID")) {return {success: false, error: "mmUID is missing"}};

        const userInfo:userInfoResponse | NotFoundException =  await this.userService.getUserInfo(query.mmUID);
        if(userInfo instanceof NotFoundException){
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        return this.pipedriveService.createPerson(userInfo.pipedriveApiKey, dto);
    }

    @ApiOkResponse({description: "Gets all users from the system.", type: getAllPersonsPipedriveResponse})
    @Get("/persons")
    async findAllPersons( @Query() query: { mmUID: string }): Promise<any> {

        if (!query.hasOwnProperty("mmUID")) {return {success: false, error: "mmUID is missing"}};

        const userInfo:userInfoResponse | NotFoundException =  await this.userService.getUserInfo(query.mmUID);
        if(userInfo instanceof NotFoundException){
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        return this.pipedriveService.findAllPersons(userInfo.pipedriveApiKey);
    }


    @ApiOkResponse({
        description: "Gets all users from the system based on given search term.",
        type: FindPersonsPipedriveResponse
    })
    @Get("persons/find/:term")
    async findPersonsByTerm(@Param("term") term: string, @Query() query: { mmUID: string }): Promise<FindPersonsPipedriveResponse | any> {

        if (!query.hasOwnProperty("mmUID")) {return {success: false, error: "mmUID is missing"}};

        // fetch pipedrive api token from database by mattermost UserID.
         const userInfo:userInfoResponse | NotFoundException =  await this.userService.getUserInfo(query.mmUID);
            if(userInfo instanceof NotFoundException){
                return {
                    success: false,
                    error: "API Key for user not found"
                };
            }

        return this.pipedriveService.findPersonsByTerm(userInfo.pipedriveApiKey, term);
    }

    @ApiOkResponse({
        description: "Create a person in pipedrive persons database, and then create lead with given title and attach newly created person to this lead.",
        type: createLeadPipedriveResponse
    })
    @Post("/leads")
    async createLead(@Body() dto: CreatePipedriveLeadDto,  @Query() query: { mmUID: string }): Promise<createLeadPipedriveResponse | any>  {

        if (!query.hasOwnProperty("mmUID")) {return {success: false, error: "mmUID is missing"}};

        const userInfo:userInfoResponse | NotFoundException =  await this.userService.getUserInfo(query.mmUID);
        if(userInfo instanceof NotFoundException){
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        return this.pipedriveService.createLead(userInfo.pipedriveApiKey, dto);
    }

    @ApiOkResponse({
        description: "A method to validate data submission from component form.",
        type: createLeadPipedriveResponse
    })
    @Post("/validateClientForm")
    async processFormFromClient(@Body() dto: (CreatePipedrivePersonDto & CreatePipedriveLeadDto),  @Query() query: { mmUID: string }): Promise<createLeadPipedriveResponse | ServiceUnavailableException | any>  {

        if (!query.hasOwnProperty("mmUID")) {return {success: false, error: "mmUID is missing"}};
        const userInfo:userInfoResponse | NotFoundException =  await this.userService.getUserInfo(query.mmUID);
        if(userInfo instanceof NotFoundException){
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        return this.pipedriveService.processFormFromClient(userInfo.pipedriveApiKey, dto);
    }
}
