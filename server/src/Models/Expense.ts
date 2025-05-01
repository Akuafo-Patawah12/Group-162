import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  expenseId: string;
  category: string;
  amount: number;
  timestamp: Date;
}

const ExpenseSchema: Schema = new Schema({
  expenseId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
