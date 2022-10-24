import {ApiProperty} from "@nestjs/swagger";

export class Owner {
    @ApiProperty()
    id: number;
}

export class Organization {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address?: any;
}

export class Person {
    @ApiProperty()
    id: number;
    @ApiProperty()
    type: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    phones: string[];
    @ApiProperty()
    emails: string[];
    @ApiProperty()
    visible_to: number;
    @ApiProperty()
    owner: Owner;
    @ApiProperty()
    custom_fields: string[];
    @ApiProperty()
    notes: any[];
    @ApiProperty()
    primary_email: string;
    @ApiProperty()
    organization: Organization;
}

export class Candidate {
    @ApiProperty()
    result_score: number;
    @ApiProperty()
    item: Person;
}

export class Data {
    @ApiProperty()
    items: Candidate[];
}

export class Pagination {
    @ApiProperty()
    start: number;
    @ApiProperty()
    limit: number;
    @ApiProperty()
    more_items_in_collection: boolean;
}

export class AdditionalData {
    @ApiProperty()
    pagination: Pagination;
}

export class FindPersonsPipedriveResponse {
    @ApiProperty()
    success: boolean;
    @ApiProperty()
    data: Data;
    @ApiProperty()
    additional_data: AdditionalData;
}



