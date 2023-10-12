import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/updatetoken')
  updateFcmDeviceToken(@Body() tokenDetails: any) {
    return this.appService.updateToken(tokenDetails);
  }
  @Post('/createuser')
  createuser(@Body() user: any) {
    return this.appService.createUser(user);
  }
  @Post('/addDailytopic')
  addDailyTopic(@Body() dailyTopic: any) {
    return this.appService.addDailyTopic(dailyTopic);
  }
  @Get('/getDailyTopicList')
  getDailyTopicList() {
    return this.appService.getDailyTopics();
  }
}
