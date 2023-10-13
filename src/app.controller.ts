import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  @Get('/getprofile')
  getProfile(@Query('userId') userId) {
    return this.appService.getProfile(userId);
  }

  @Get('/getDailyTopicList')
  getDailyTopicList() {
    return this.appService.getDailyTopics();
  }
  @Get('/get-problem-of-the-day')
  getProblemOfTheDay() {
    return this.appService.getProblemOfTheDay();
  }
  @Post('/getQuestionDetails')
  getQuestionDetails(@Body() questionIdsData: any) {
    console.log(questionIdsData);
    return this.appService.getQuestionDetails(questionIdsData);
  }
  @Get('/getSolution')
  getSolution(@Query('questionId') questionId: any) {
    return this.appService.getSolution(questionId);
  }
  @Get('/get-daily-topic-by-id')
  getDailyTopicById(
    @Query('userId') userId,
    @Query('dailyTopicId') dailyTopicId,
  ) {
    return this.appService.getDailyTopicById(userId, dailyTopicId);
  }
}
