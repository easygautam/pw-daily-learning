import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductSellDocument = ProductSell & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
  collection: 'product_sell',
})
export class ProductSell {
  @Prop({})
  type: string;
  @Prop({})
  data: string;
}
export const questionSchema = SchemaFactory.createForClass(ProductSell);
