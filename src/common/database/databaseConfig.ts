import { User } from "../entities/user.entity";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'Demo',
    entities: [User],
    synchronize: true,
};