import mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface Notification extends Document {
  customerId: string;
  productName: string;
  message: string;
  date: Date;
}

const NotificationSchema: Schema = new Schema({
  customerId: { type: String, required: true, ref: 'User' },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export default mongoose.model<Notification>('Notification', NotificationSchema);