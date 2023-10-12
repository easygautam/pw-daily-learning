import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Question, QuestionSchema } from './entities/question.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aiyoit:RMlijDLxmcKPkbJU@aiyoit.wfj2zph.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'aiyoit',
      },
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
