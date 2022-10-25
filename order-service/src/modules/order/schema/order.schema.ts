import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
  collection: 'orders',
})
export class Order {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  transactionId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
