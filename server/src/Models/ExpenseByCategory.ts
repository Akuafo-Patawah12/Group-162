import mongoose, { Document, Schema } from 'mongoose';

export interface IExpenseByCategory extends Document {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: mongoose.Types.Decimal128;
  date: Date;
  expenseSummary: mongoose.Types.ObjectId;
}

const ExpenseByCategorySchema: Schema = new Schema({
  expenseByCategoryId: { type: String, required: true, unique: true },
  expenseSummaryId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: mongoose.Schema.Types.Decimal128, required: true },
  date: { type: Date, required: true },
  expenseSummary: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseSummary' }
});

export default mongoose.model<IExpenseByCategory>('ExpenseByCategory', ExpenseByCategorySchema);
