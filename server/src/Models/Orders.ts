import mongoose, { Schema, Document } from 'mongoose';

export interface Orders extends Document {
  productName: string;
  quantity: number;
  status: 'Delivered' | 'Pending';
  dateOrdered: Date;
}

const OrdersSchema: Schema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Delivered', 'Pending'],
    required: true,
  },
  dateOrdered: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<Orders>('Order', OrdersSchema);
