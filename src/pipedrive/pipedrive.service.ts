import {Injectable, NotFoundException, ServiceUnavailableException} from '@nestjs/common';
import {CreatePipedrivePersonDto} from './dto/create-pipedrive-person.dto';
import {PipedriveApiService} from "./pipedrive-api.service";
import {CreateHumanPipedriveResponse} from "./entities/create-human-pipedrive-response";
import {CreatePipedriveLeadDto} from "./dto/create-pipedrive-lead.dto";
import {getAllPersonsPipedriveResponse} from "./entities/get-all-persons-pipedrive-response";
import {createLeadPipedriveResponse} from "./entities/create-lead-pipedrive-response";
import {FindPersonsPipedriveResponse} from "./entities/find-persons-pipedrive-response";
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, map, Observable, throwError} from 'rxjs';
import {UserInfoService} from "../user-info/user-info.service";
import {userInfoResponse} from "../user-info/entities/types";
import {IsApiKeyValid} from "./entities/is-api-key-valid";


@Injectable()
export class PipedriveService {
    constructor(private pdApiService: PipedriveApiService, private httpService: HttpService, private userService: UserInfoService) {
    }

    private baseUrl = "https://api.pipedrive.com/v1";


    /*  PERSONS SECTION  */
    // via client
    // async createPerson(dto: CreatePipedrivePersonDto): Promise<CreateHumanPipedriveResponse> {
    //     console.log(dto);
    //     return await this.pdApiService.getHumansApi().addPerson({
    //         // This value is a key for custom person field for position
    //         "cbf02adcbf18655ca250a8d8fbfba87bd99a2b6c": dto.position,
    //         // This value is a key for custom person field for LinkedInUrl
    //         "11ad567abeb05281bd450eb7cb64cfd5b82c01ff": dto.LinkedIn,
    //         "name": dto.name,
    //         // "name": "createPipedriveDto.name",
    //         "email": [
    //             {
    //                 "value": dto.email,
    //                 // "value": "testmail@mail.com",
    //                 "primary": true,
    //                 "label": "label for test mail 1"
    //             }
    //         ],
    //
    //         "phone": [
    //             {
    //                 "value": dto.phone,
    //                 // "value": "123456789",
    //                 "primary": true,
    //                 "label": "label for test phone 1"
    //             }
    //         ]
    //     });
    // }

    // via direct api call
    async createPerson(query: { mmUID: string }, dto: CreatePipedrivePersonDto): Promise<any> {

        const userInfo: userInfoResponse | NotFoundException = await this.userService.getUserInfo(query.mmUID);
        if (userInfo instanceof NotFoundException) {
            return {
                success: false,
                error: "API Key for user not found"
            };
        }
        const personData = {
            // This value is a key for custom person field for position
            "cbf02adcbf18655ca250a8d8fbfba87bd99a2b6c": dto.position,
            // This value is a key for custom person field for LinkedInUrl
            "11ad567abeb05281bd450eb7cb64cfd5b82c01ff": dto.LinkedIn,
            "name": dto.name,
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
        }
        const url = `${this.baseUrl}/persons?api_token=${userInfo.pipedriveApiKey}`;
        console.log(url);
        const data = await firstValueFrom(this.httpService.post(url, personData).pipe(
            map(res => res.data),
            catchError((error: any) => {
                return throwError(error);
            }),
        ))
        return data;
    }

    // via client
    // async findAllPersons(): Promise<getAllPersonsPipedriveResponse> {
    //     return this.pdApiService.getHumansApi().getPersons();
    // }

    // via direct api call
    async findAllPersons(query: { mmUID: string }): Promise<any> {
        const userInfo: userInfoResponse | NotFoundException = await this.userService.getUserInfo(query.mmUID);
        if (userInfo instanceof NotFoundException) {
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        const url = `${(this.baseUrl)}/persons?api_token=${userInfo.pipedriveApiKey}`
        const data = await firstValueFrom(this.httpService
            .get(url)
            .pipe(
                map(response => response.data),
                catchError((error: any, caught: Observable<any>) => {
                    console.log(error);
                    return throwError(error);
                })
            )
        );
        return data;
    }

    async validatePipedriveApiKey(query: { mmUID: string }): Promise<IsApiKeyValid> {
        try {
            const userInfo: userInfoResponse | NotFoundException = await this.userService.getUserInfo(query.mmUID);
            // if there are no user info in db, API key is automatically considered invalid
            if (userInfo instanceof NotFoundException) {
                return {
                    isValid: false,
                };
            }

            // Since there are no method to validate pipedrive api key, we will try to get fist person info, and if it will be success, we will return true, if not - false
            const url = `${(this.baseUrl)}/persons?api_token=${userInfo.pipedriveApiKey}&limit=1`
            const data = await firstValueFrom(this.httpService
                .get(url)
                .pipe(
                    map(response => response.data),
                )
            );
            return {isValid: true};
        }
        catch(err) {
            return {isValid: false};
        }
    }

    // via client
    // async findPersonsByTerm(term: string) : Promise<FindPersonsPipedriveResponse> {
    //     return await this.pdApiService.getHumansApi().searchPersons(term, {
    //         "start": 0,
    //         "limit": 15,
    //     });
    // }

    // via direct api call
    async findPersonsByTerm(query: { mmUID: string }, term: string): Promise<any> {
        const userInfo: userInfoResponse | NotFoundException = await this.userService.getUserInfo(query.mmUID);
        if (userInfo instanceof NotFoundException) {
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        const url = `${(this.baseUrl)}/persons/search?term=${term}&api_token=${userInfo.pipedriveApiKey}&start=0&limit=15`;
        const data = await firstValueFrom(this.httpService
            .get(url)
            .pipe(
                map(response => response.data),
                catchError((error: any) => {
                    return throwError(error);
                })
            )
        );
        return data;
    }


    /*  LEADS SECTION  */

    // via client
    // async createLead(dto: CreatePipedriveLeadDto): Promise<createLeadPipedriveResponse> {
    //     // Create a lead
    //     return await this.pdApiService.getLeadsApi().addLead({
    //         title: dto.lead_name,
    //         person_id: dto.person_id,
    //     })
    // }

    // via direct api call
    async createLead(query: { mmUID: string }, dto: CreatePipedriveLeadDto): Promise<any> {
        const userInfo: userInfoResponse | NotFoundException = await this.userService.getUserInfo(query.mmUID);
        if (userInfo instanceof NotFoundException) {
            return {
                success: false,
                error: "API Key for user not found"
            };
        }

        const leadData = {
            title: dto.lead_name,
            person_id: dto.person_id,
        }
        const url = `${(this.baseUrl)}/leads?api_token=${userInfo.pipedriveApiKey}`;

        const data = await firstValueFrom(this.httpService.post(url, leadData).pipe(
            map(res => res.data),
            catchError((error: any) => {
                return throwError(error);
            })
        ));

        return data;
    }

    /* This is the main method we use to process form from client.
    This method firstly creates a person in pipedrive persons database, gets ID of newly created person,
     and then uses this id to create lead. We need person_id to attach person with that ID it to lead.
     */
    async processFormFromClient(query: { mmUID: string }, dto: (CreatePipedrivePersonDto & CreatePipedriveLeadDto)): Promise<createLeadPipedriveResponse | ServiceUnavailableException | any> {

        // Create person
        let personId: number = -1;
        // TODO: refactor this method, so that it doesn't call userInfo database to get the same api key 2 times: while creating person, and creating lead.
        try {
            const personInfo = await this.createPerson(query, {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                position: dto.position,
                LinkedIn: dto.LinkedIn,
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
            return await this.createLead(query, {
                lead_name: dto.lead_name,
                person_id: personId
            });
        } catch (e) {
            return new ServiceUnavailableException(e);
        }
    }
}
