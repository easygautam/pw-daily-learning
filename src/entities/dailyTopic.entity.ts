import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DailyTopicDocument = DailyTopic & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
  collection: 'daily_topic',
})
export class DailyTopic {
  @Prop({})
  subjectName: string;
  @Prop({})
  topicName: string;
  @Prop({})
  dateTime: Date;
  @Prop({})
  status: string;
  @Prop({})
  questions: any;
  @Prop({})
  productSellId: string;
}
export const questionSchema = SchemaFactory.createForClass(DailyTopic);
