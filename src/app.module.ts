import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { ApiTokensModule } from './api-tokens/api-tokens.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, ApiTokensModule, PrismaModule],
})
export class AppModule {}
