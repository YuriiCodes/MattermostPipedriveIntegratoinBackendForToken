import { Injectable } from '@nestjs/common';
import { CreatePipedriveDto } from './dto/create-pipedrive.dto';
import {PipedriveApiService} from "./pipedrive-api.service";
import {CreateHumanPipedriveResponseDto} from "./dto/create-human-pipedrive-response.dto";
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";

@Injectable()
export class PipedriveService {
  constructor(private pdApiService: PipedriveApiService) {
  }

  // For persons
  async createPerson(dto: CreatePipedriveDto) :Promise<CreateHumanPipedriveResponseDto>{
    console.log(dto);
    return  await this.pdApiService.getHumansApi().addPerson({
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
  async findAllPersons() {
    return this.pdApiService.getHumansApi().getPersons();
  }

  //  For leads
  async createLead(dto: CreatePipedriveLeadDto) {

    // Create a user with the given name, email and phone so that later we can use user's ID to create a lead associated with the user
    const leadOwner = await this.createPerson(dto);

    // Create a lead
    const createdLead = await this.pdApiService.getLeadsApi().addLead({
      title: dto.lead_name,
      person_id: leadOwner.data.id
    })

    console.log(createdLead);
    return createdLead;
  }

}
