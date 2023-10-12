import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    @InjectModel(Question.name)
    private readonly Question: Model<Question>,
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
      });
    } else {
      console.log(userData);
      return userData;
    }
  }

  async addQuestion(questionData) {
    return await this.Question.create(questionData);
  }
}
