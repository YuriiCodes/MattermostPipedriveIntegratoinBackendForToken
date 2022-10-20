import {ApiProperty} from "@nestjs/swagger";

class Data {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    owner_id: number;
    @ApiProperty()
    creator_id: number;
    @ApiProperty()
    label_ids: any[];
    @ApiProperty()
    person_id: number;
    @ApiProperty()
    organization_id?: any;
    @ApiProperty()
    source_name: string;
    @ApiProperty()
    is_archived: boolean;
    @ApiProperty()
    was_seen: boolean;
    @ApiProperty()
    expected_close_date?: any;
    @ApiProperty()
    next_activity_id?: any;
    @ApiProperty()
    add_time: Date;
    @ApiProperty()
    update_time: Date;
    @ApiProperty()
    visible_to: string;
    @ApiProperty()
    cc_email: string;
}

export class createLeadPipedriveResponse {
    @ApiProperty()
    success: boolean;
    @ApiProperty()
    data: Data;
}



