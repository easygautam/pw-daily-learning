
import {  Module } from '@nestjs/common';
import { HttpUtilService } from '../http-utils/http-util.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HttpConfigService } from '../config/http.config.service';



@Module({
  imports: [
    HttpModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  providers: [HttpUtilService],
  exports: [HttpUtilService],
})
export class CoreModule {}
