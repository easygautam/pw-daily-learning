import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';
import { DailyTopic } from './entities/dailyTopic.entity';
import { DTResult } from './entities/dtResult.entity';
import { HttpUtilService } from './bootstrap/common/http-utils/http-util.service';

@Injectable()
export class AppService {
  constructor(
    private httpUtilService: HttpUtilService,
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    @InjectModel(Question.name)
    private readonly Question: Model<Question>,
    @InjectModel(DailyTopic.name)
    private readonly DailyTopic: Model<DailyTopic>,
    @InjectModel(DTResult.name)
    private readonly Dtresult: Model<DTResult>,
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
        rewards: 50,
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
    const present = dat.filter(
      (data) => data.dateTime.getDate() === new Date().getDate(),
    );
    const upcoming = dat.filter(
      (data) => data.dateTime.getDate() >= new Date().getDate(),
    );
    const past = dat.filter(
      (data) => data.dateTime.getDate() <= new Date().getDate(),
    );
    return { present, upcoming, past };
  }
  async getQuestionDetails(questionIdsData) {
    return await Promise.all(
      questionIdsData.questionIds.map((questionId) =>
        this.Question.findById(questionId),
      ),
    );
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
    const questionPromises = dailyTopicData.questions.map((questionId) => {
        return this.Question.findById(questionId);
      });
    // To get the results, you can use Promise.all
    const questions = await Promise.all(questionPromises);
    return { dailyTopicData, status, questions };
  }

  async submitTest(submitObject) {

    const questionDetails = submitObject.selectedOptions.map((selectedOption) =>
      this.Question.findById(selectedOption.questionId),
    );
    const finalQuestionDetails = await Promise.all(questionDetails);
    console.log(finalQuestionDetails);

    let totalScore = 0;
    submitObject.selectedOptions.map((selectedOption, index) => {
      if (
        selectedOption.selectedOption ==
        finalQuestionDetails[index].correctOption
      ) {
        totalScore += 1;
      }
    });
    let rewards = 0;
    if (totalScore == finalQuestionDetails.length) {
      await this.UserModel.findByIdAndUpdate(submitObject.userId, {
        $inc: { rewards: 5 },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rewards = 5;
    }
    const existingResultDat = await this.Dtresult.findOne({
      DailyTopicId: submitObject.DailyTopicId,
      userId: submitObject.userId,
    });
    let resultDat;
    if (existingResultDat) {
      resultDat = await this.Dtresult.findByIdAndUpdate(existingResultDat._id, {
        totalScore: totalScore,
        selectedOptions: submitObject.selectedOptions,
      });
    } else {
      resultDat = await this.Dtresult.create({
        totalScore: totalScore,
        userId: submitObject.userId,
        selectedOptions: submitObject.selectedOptions,
        DailyTopicId: submitObject.DailyTopicId,
      });
    }
    return { resultDat, rewards };
  }
  async getSolution(dailyTopicId, userId) {
    const dailyTopicDetails = await this.getDailyTopicById(
      userId,
      dailyTopicId,
    );
    const studentSelection = await this.Dtresult.find({
      userId: userId,
      DailyTopicId: dailyTopicId,
    });
    return { dailyTopicDetails, studentSelection };
  }
  async sendNotification(topicId) {
    try {
      const headers = {
        Authorization:
          'key=AAAAkkbMBJM:APA91bHjqvZCdINMtTbh-Fsm5N8rUiqHh7AkRmOQAw-_bZ9fMxNs5AbzVBk3PeSd43xpuRJkbxzXaV6Us8Svm0Pmm1Pl3KuVQ-kDRbih9aI7Dw6vEQY4M_jRDI2R9EwaSUiGJrOxLfNr',
      };
      const body = {
        to: '/topics/daily-topic',
        data: {
          title: 'New Question ',
          description: 'Solve this new question',
          type: 'DAILY_TOPIC',
          dataId: topicId,
        },
      };
      const url = 'https://fcm.googleapis.com/fcm/send';
      return await this.httpUtilService.post(url, body, headers);
    } catch (error) {
      console.log(error);
    }
  }
}