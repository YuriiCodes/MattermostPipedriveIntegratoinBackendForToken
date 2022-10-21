import {Injectable, ServiceUnavailableException} from '@nestjs/common';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {PipedriveApiService} from "./pipedrive-api.service";
import {CreateHumanPipedriveResponse} from "./entities/create-human-pipedrive-response";
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {getAllPersonsPipedriveResponse} from "./entities/get-all-persons-pipedrive-response";
import {createLeadPipedriveResponse} from "./entities/create-lead-pipedrive-response";
import {ProcessFormSubmitFromClientDto} from "./dto/process-form-submit-from-client.dto";

@Injectable()
export class PipedriveService {
    constructor(private pdApiService: PipedriveApiService) {
    }

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
        // Create a lead
        return await this.pdApiService.getLeadsApi().addLead({
            title: dto.lead_name,
            person_id: dto.person_id
        })
    }

    /* This is the main method we use to process form from client.
    This method firstly creates a person in pipedrive persons database, gets ID of newly created person,
     and then uses this id to create lead. We need person_id to attach person with that ID it to lead.
     */
    async processFormFromClient(dto: ProcessFormSubmitFromClientDto): Promise<createLeadPipedriveResponse | ServiceUnavailableException> {
        // Create person
        let personId: number = -1;
        try {
            const personInfo = await this.createPerson({
                name: dto.name,
                email: dto.email,
                phone: dto.phone
            });
            personId = personInfo.data.id;
        } catch (e) {
            return new ServiceUnavailableException(e);
        }
        // The ID wasn't fetched correctly, therefore we can't create a lead.
        if (personId === 1) {
            return new ServiceUnavailableException("Oops! We can't create a person in Pipedrive database, therefore we can't create a lead. Please try again later.");
        }

        // Create lead
        try {
            return await this.createLead({
                lead_name: dto.lead_name,
                person_id: personId
            });
        } catch (e) {
            return new ServiceUnavailableException(e);
        }
    }
}
