import {ApiProperty} from "@nestjs/swagger";

export class Phone {
    @ApiProperty()
    value: string;
    @ApiProperty()
    primary: boolean;
    @ApiProperty()
    label: string;
}

export class Email {
    @ApiProperty()
    value: string;
    @ApiProperty()
    primary: boolean;
    @ApiProperty()
    label: string;
}

export class OwnerId {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    has_pic: number;
    @ApiProperty()
    pic_hash?: any;
    @ApiProperty()
    active_flag: boolean;
    @ApiProperty()
    value: number;
}

export class Data {
    @ApiProperty()
    id: number;
    @ApiProperty()
    company_id: number;
    @ApiProperty()
    active_flag: boolean;
    @ApiProperty()
    phone: Phone[];
    @ApiProperty()
    email: Email[];
    @ApiProperty()
    primary_email: string;
    @ApiProperty()
    first_char: string;
    @ApiProperty()
    add_time: string;
    @ApiProperty()
    update_time: string;
    @ApiProperty()
    visible_to: string;
    @ApiProperty()
    label?: any;
    @ApiProperty()
    org_name?: any;
    @ApiProperty()
    owner_name: string;
    @ApiProperty()
    cc_email: string;
    @ApiProperty()
    owner_id: OwnerId;
    @ApiProperty()
    name: string;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name?: any;
    @ApiProperty()
    open_deals_count: number;
    @ApiProperty()
    related_open_deals_count: number;
    @ApiProperty()
    closed_deals_count: number;
    @ApiProperty()
    related_closed_deals_count: number;
    @ApiProperty()
    participant_open_deals_count: number;
    @ApiProperty()
    participant_closed_deals_count: number;
    @ApiProperty()
    email_messages_count: number;
    @ApiProperty()
    activities_count: number;
    @ApiProperty()
    done_activities_count: number;
    @ApiProperty()
    undone_activities_count: number;
    @ApiProperty()
    files_count: number;
    @ApiProperty()
    notes_count: number;
    @ApiProperty()
    followers_count: number;
    @ApiProperty()
    won_deals_count: number;
    @ApiProperty()
    related_won_deals_count: number;
    @ApiProperty()
    lost_deals_count: number;
    @ApiProperty()
    related_lost_deals_count: number;
    @ApiProperty()
    delete_time?: any;
    @ApiProperty()
    next_activity_date?: any;
    @ApiProperty()
    next_activity_time?: any;
    @ApiProperty()
    next_activity_id?: any;
    @ApiProperty()
    last_activity_id?: any;
    @ApiProperty()
    last_activity_date?: any;
    @ApiProperty()
    last_incoming_mail_time?: any;
    @ApiProperty()
    last_outgoing_mail_time?: any;
}

export class UserData
{
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    has_pic: number;
    @ApiProperty()
    pic_hash ? : any;
    @ApiProperty()
    active_flag: boolean;
}

export class User {
    @ApiProperty()
    UserData: UserData;
}

export class RelatedObjects {
    @ApiProperty()
    user: User;
}

export class CreateHumanPipedriveResponse {
    @ApiProperty()
    success: boolean;
    @ApiProperty()
    data: Data;
    @ApiProperty()
    related_objects: RelatedObjects;
}



