import mongoose, { Schema, Document } from 'mongoose';

export interface Orders extends Document {
  customerId: string;
  productName: string;
  quantity: number;
  status: 'Delivered' | 'Pending';
  dateOrdered: Date;
}

const OrdersSchema: Schema = new Schema({
  customerId: {type: String, required: true,ref: 'User'},
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
  price:{
    type: Number,
    default:0
  },
  view:{
    type: Boolean,
    default:false
  },
  dateOrdered: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<Orders>('Order', OrdersSchema);
