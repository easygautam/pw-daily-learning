import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';
import { DailyTopic } from './entities/dailyTopic.entity';
import { DTResult } from './entities/dtResult.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    @InjectModel(Question.name)
    private readonly Question: Model<Question>,
    @InjectModel(DailyTopic.name)
    private readonly DailyTopic: Model<DailyTopic>,
    @InjectModel(DTResult.name)
    private readonly Dtresult: Model<DTResult>
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async updateToken(tokenDetails: any) {
    await this.UserModel.findByIdAndUpdate(tokenDetails._id, {
      firebaseDeviceToken: tokenDetails.token,
    });
  }
  async createUser(user: any) {
    const userData = await this.UserModel.findOne({ mobile: user.mobile });
    console.log(userData);
    if (!userData) {
      return await this.UserModel.create({
        mobile: user.mobile,
        streak: 0,
      });
    } else {
      console.log(userData);
      return userData;
    }
  }

  async addQuestion(questionData) {
    return await this.Question.create(questionData);
  }
  async addDailyTopic(dailyTopic) {
    return await this.DailyTopic.create(dailyTopic);
  }
  async getDailyTopics() {
    return await this.DailyTopic.find();
  }
  async getProfile(userId){
    return await this.UserModel.findById(userId);
  }
  async getProblemOfTheDay(){
    const dat = await this.getDailyTopics();
    const res = dat.filter(
      (data) => data.dateTime.getDate() === new Date().getDate(),
    );
    return res;
  }
  async getQuestionDetails(questionIdsData) {
    return await Promise.all(
      questionIdsData.questionIds.map((questionId) =>
        this.Question.findById(questionId),
      ),
    );
  }
  async getSolution(questionId){
    return await this.Question.findById(questionId);
  }
  async getDailyTopicById(userId,dailyTopicId){
    let status = 'unattempted';
    const dat = await this.Dtresult.findOne({
      userId: userId,
      DailyTopicId: dailyTopicId,
    });
    console.log("----------dat",dat);
    if (dat) status = 'attempted';

    let dailyTopicData = await this.DailyTopic.findById(dailyTopicId);
    const questionPromises = dailyTopicData.questions.map(
      async (questionId) => {
        return await this.Question.findById(questionId);
      });
    // To get the results, you can use Promise.all
    const questions = await Promise.all(questionPromises);
    return { dailyTopicData, status, questions };
  }
}
