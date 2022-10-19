import {Injectable} from "@nestjs/common";
const pipedrive = require('pipedrive');

@Injectable()
export class PipedriveApiService {
    defaultClient = pipedrive.ApiClient.instance;
    apiToken = this.defaultClient.authentications.api_key;
    constructor() {
        this.apiToken.apiKey = '9c1ba905eeccc08eb6df0f4397b90aa7f85a6172';
    }

    public  getHumansApi() {
         return  new pipedrive.PersonsApi();
    }

    public getLeadsApi() {
        return new pipedrive.LeadsApi();
    }
}