import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from './user/user.module';
import {UserInfoModule} from './user-info/user-info.module';
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
        UserInfoModule,
        PrismaModule,
        PipedriveModule
    ],
})
export class AppModule {
}
