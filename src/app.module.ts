import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auht.module";
import { UserModule } from './user/user.module';
import { ApiTokensModule } from './api-tokens/api-tokens.module';

@Module({
  imports: [AuthModule, UserModule, ApiTokensModule],
})
export class AppModule {}
