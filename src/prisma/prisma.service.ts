import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        super({
            datasources: {
                    db: {
                        url: "mongodb+srv://root:pass@cluster0.vbogplp.mongodb.net/test"
                    }
                }
        });

    }
}