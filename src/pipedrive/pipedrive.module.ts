import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { PipedriveController } from './pipedrive.controller';
import {PipedriveApiService} from "./pipedrive-api.service";

@Module({
  controllers: [PipedriveController],
  providers: [PipedriveService, PipedriveApiService]
})
export class PipedriveModule {}
