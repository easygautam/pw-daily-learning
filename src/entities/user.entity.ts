import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
  collection: 'user',
})
export class User {
  @Prop({})
  name: string;
  @Prop({})
  mobile: number;
  @Prop({})
  firebaseDeviceToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
