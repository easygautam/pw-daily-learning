import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DTResultDocument = DTResult & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
  collection: 'dtResult',
})
export class DTResult {
  @Prop({})
  DailyTopicId: string;
  @Prop({ type: Object })
  selectedOptions: any;
  @Prop({})
  userId: string;
  @Prop({})
  totalScore: string;
}
export const dtResultSchema = SchemaFactory.createForClass(DTResult);
