import { Request, Response } from 'express';
import ExpenseByCategory from '../Models/ExpenseByCategory'; // Adjust the path based on your folder structure

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await ExpenseByCategory.find()
      .sort({ date: -1 });

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(item => ({
      ...item.toObject(),
      amount: item.amount.toString(), // If using Decimal128 or BigInt
    }));

    res.json(expenseByCategorySummary);
  } catch (error) {
    console.error('Error fetching expenses by category:', error);
    res.status(500).json({ message: 'Error retrieving expenses by category' });
  }
};
