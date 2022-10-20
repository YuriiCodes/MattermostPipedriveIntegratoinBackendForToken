import {Injectable} from '@nestjs/common';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {PipedriveApiService} from "./pipedrive-api.service";
import {CreateHumanPipedriveResponse} from "./entities/create-human-pipedrive-response";
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {getAllPersonsPipedriveResponse} from "./entities/get-all-persons-pipedrive-response";
import {createLeadPipedriveResponse} from "./entities/create-lead-pipedrive-response";

@Injectable()
export class PipedriveService {
    constructor(private pdApiService: PipedriveApiService) {}


    /*  PERSONS SECTION  */
    async createPerson(dto: CreatePipedrivePersonDto): Promise<CreateHumanPipedriveResponse> {
        console.log(dto);
        return await this.pdApiService.getHumansApi().addPerson({
            "name": dto.name,
            // "name": "createPipedriveDto.name",
            "email": [
                {
                    "value": dto.email,
                    // "value": "testmail@mail.com",
                    "primary": true,
                    "label": "label for test mail 1"
                }
            ],

            "phone": [
                {
                    "value": dto.phone,
                    // "value": "123456789",
                    "primary": true,
                    "label": "label for test phone 1"
                }
            ]
        });
    }

    async findAllPersons(): Promise<getAllPersonsPipedriveResponse> {
        return this.pdApiService.getHumansApi().getPersons();
    }



    /*  LEADS SECTION  */
    async createLead(dto: CreatePipedriveLeadDto): Promise<createLeadPipedriveResponse> {

        // Create a user with the given name, email and phone so that later we can use user's ID to create a lead associated with the user
        const leadOwner = await this.createPerson(dto);

        // Create a lead
        return await this.pdApiService.getLeadsApi().addLead({
            title: dto.lead_name,
            person_id: leadOwner.data.id
        })
    }
}
