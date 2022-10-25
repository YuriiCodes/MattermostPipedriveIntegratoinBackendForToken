import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { PipedriveController } from './pipedrive.controller';
import {PipedriveApiService} from "./pipedrive-api.service";
import {HttpModule} from "@nestjs/axios";
import {UserInfoModule} from "../user-info/user-info.module";

@Module({
  imports: [HttpModule, UserInfoModule],
  controllers: [PipedriveController],
  providers: [PipedriveService, PipedriveApiService, UserInfoModule]
})
export class PipedriveModule {}
