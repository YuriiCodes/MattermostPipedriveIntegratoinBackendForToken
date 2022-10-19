export interface Phone {
    value: string;
    primary: boolean;
    label: string;
}

export interface Email {
    value: string;
    primary: boolean;
    label: string;
}

export interface OwnerAccount {
    id: number;
    name: string;
    email: string;
    has_pic: number;
    pic_hash?: any;
    active_flag: boolean;
    value: number;
}

export interface OrganizationAccount {
    name: string;
    people_count: number;
    owner_id: number;
    address?: any;
    cc_email: string;
    active_flag: boolean;
    value: number;
}

export interface responseData {
    id: number;
    company_id: number;
    active_flag: boolean;
    phone: Phone[];
    email: Email[];
    primary_email: string;
    first_char: string;
    add_time: string;
    update_time: string;
    visible_to: string;
    label?: any;
    org_name: string;
    owner_name: string;
    cc_email: string;
    owner_id: OwnerAccount;
    org_id: OrganizationAccount;
    name: string;
    first_name: string;
    last_name: string;
    open_deals_count: number;
    related_open_deals_count: number;
    closed_deals_count: number;
    related_closed_deals_count: number;
    participant_open_deals_count: number;
    participant_closed_deals_count: number;
    email_messages_count: number;
    activities_count: number;
    done_activities_count: number;
    undone_activities_count: number;
    files_count: number;
    notes_count: number;
    followers_count: number;
    won_deals_count: number;
    related_won_deals_count: number;
    lost_deals_count: number;
    related_lost_deals_count: number;
    delete_time?: any;
    next_activity_date: string;
    next_activity_time: string;
    next_activity_id?: number;
    last_activity_id?: any;
    last_activity_date?: any;
    last_incoming_mail_time?: any;
    last_outgoing_mail_time?: any;
}

export interface Pagination {
    start: number;
    limit: number;
    more_items_in_collection: boolean;
}

export interface AdditionalData {
    pagination: Pagination;
}

export interface Organization {
    info?: UserInfo;
}


interface UserInfo{
    id: number;
    name: string;
    email: string;
    has_pic: number;
    pic_hash ? : any;
    active_flag: boolean;
}

export interface User {
    info?: UserInfo;
}

export interface RelatedObjects {
    organization: Organization;
    user: User;
}

export interface getAllPersonsPipedriveResponse {
    success: boolean;
    data: responseData[];
    additional_data: AdditionalData;
    related_objects: RelatedObjects;
}



