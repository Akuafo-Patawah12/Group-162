import { Request, Response } from 'express';

// Import Mongoose models
import Product from '../Models/ProductSchema';
import SalesSummary from '../Models/SalesSummary';
import PurchaseSummary from '../Models/PurchaseSummary';
import ExpenseSummary from '../Models/ExpenseSummary';
import ExpenseByCategory from '../Models/ExpenseByCategory';

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await Product.find()
      .sort({ stockQuantity: -1 })
      .limit(15);

    const salesSummary = await SalesSummary.find()
      .sort({ date: -1 })
      .limit(5);

    const purchaseSummary = await PurchaseSummary.find()
      .sort({ date: -1 })
      .limit(5);

    const expenseSummary = await ExpenseSummary.find()
      .sort({ date: -1 })
      .limit(5);

    const expenseByCategorySummaryRaw = await ExpenseByCategory.find()
      .sort({ date: -1 })
      .limit(5);

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(item => ({
      ...item.toObject(),
      amount: item.amount.toString() // Convert Decimal128 to string
    }));

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary
    });
  } catch (error) {
    console.error('Dashboard Metrics Error:', error);
    res.status(500).json({ message: 'Error retrieving dashboard metrics' });
  }
};