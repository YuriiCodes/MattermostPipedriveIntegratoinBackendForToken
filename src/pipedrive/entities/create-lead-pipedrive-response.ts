interface Data {
    id: string;
    title: string;
    owner_id: number;
    creator_id: number;
    label_ids: any[];
    person_id: number;
    organization_id?: any;
    source_name: string;
    is_archived: boolean;
    was_seen: boolean;
    expected_close_date?: any;
    next_activity_id?: any;
    add_time: Date;
    update_time: Date;
    visible_to: string;
    cc_email: string;
}

export interface createLeadPipedriveResponse {
    success: boolean;
    data: Data;
}



