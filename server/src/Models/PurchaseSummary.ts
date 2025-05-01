import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchaseSummary extends Document {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: Date;
}

const PurchaseSummarySchema: Schema = new Schema({
  purchaseSummaryId: { type: String, required: true, unique: true },
  totalPurchased: { type: Number, required: true },
  changePercentage: { type: Number },
  date: { type: Date, required: true }
});

export default mongoose.model<IPurchaseSummary>('PurchaseSummary', PurchaseSummarySchema);
