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
  @Prop({ type: Object })
  questions: any;
  @Prop({})
  productSellId: string;
}
export const dailyTopicSchema = SchemaFactory.createForClass(DailyTopic);
