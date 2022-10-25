import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({
  timestamps: true,
  collection: 'payments',
})
export class Payment {
  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
