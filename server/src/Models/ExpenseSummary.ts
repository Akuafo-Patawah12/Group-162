import mongoose, { Document, Schema } from 'mongoose';

export interface IExpenseSummary extends Document {
  expenseSummaryId: string;
  totalExpenses: number;
  date: Date;
}

const ExpenseSummarySchema: Schema = new Schema({
  expenseSummaryId: { type: String, required: true, unique: true },
  totalExpenses: { type: Number, required: true },
  date: { type: Date, required: true }
});

export default mongoose.model<IExpenseSummary>('ExpenseSummary', ExpenseSummarySchema);
