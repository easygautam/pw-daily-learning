import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Question, QuestionSchema } from './entities/question.entity';
import { DailyTopic, dailyTopicSchema } from './entities/dailyTopic.entity';
import { DTResult, dtResultSchema } from './entities/dtResult.entity';
import { CoreModule } from './bootstrap/common/core/core.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRoot(
      'mongodb+srv://aiyoit:RMlijDLxmcKPkbJU@aiyoit.wfj2zph.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'aiyoit',
      },
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: DailyTopic.name, schema: dailyTopicSchema },
      { name: DTResult.name, schema: dtResultSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
