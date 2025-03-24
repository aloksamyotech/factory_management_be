import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/user.module';
import { ItemModule } from './modules/item/item.module';
import { databaseConfig } from './common/database/databaseConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    ItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }