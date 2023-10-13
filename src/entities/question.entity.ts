import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
  collection: 'question',
})
export class Question {
  @Prop({})
  questionDescription: string;
  @Prop({})
  optionA: string;
  @Prop({})
  optionB: string;
  @Prop({})
  optionC: string;
  @Prop({})
  optionD: string;
  @Prop({})
  correctOption: string;
  @Prop({})
  solution: string;
}
export const QuestionSchema = SchemaFactory.createForClass(Question);
