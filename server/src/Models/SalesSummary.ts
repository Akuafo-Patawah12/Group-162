import mongoose, { Document, Schema } from 'mongoose';

export interface ISalesSummary extends Document {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: Date;
}

const SalesSummarySchema: Schema = new Schema({
  salesSummaryId: { type: String, required: true, unique: true },
  totalValue: { type: Number, required: true },
  changePercentage: { type: Number },
  date: { type: Date, required: true }
});

export default mongoose.model<ISalesSummary>('SalesSummary', SalesSummarySchema);
