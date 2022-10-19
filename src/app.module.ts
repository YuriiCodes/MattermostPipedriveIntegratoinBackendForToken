import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from './user/user.module';
import {ApiTokensModule} from './api-tokens/api-tokens.module';
import {PrismaModule} from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import {PipedriveModule} from "./pipedrive/pipedrive.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UserModule,
        ApiTokensModule,
        PrismaModule,
        PipedriveModule
    ],
})
export class AppModule {
}
