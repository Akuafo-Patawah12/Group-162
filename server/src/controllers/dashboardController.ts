import { Request, Response } from 'express';

// Import Mongoose models
import Product from '../Models/ProductSchema';
import SalesSummary from '../Models/SalesSummary';
import PurchaseSummary from '../Models/PurchaseSummary';
import ExpenseSummary from '../Models/ExpenseSummary';
import ExpenseByCategory from '../Models/ExpenseByCategory';
import { Model } from "mongoose";
import {ISale} from "../Models/Sales";
import {IPurchase} from "../Models/Purchases";
import Sale from "../Models/Sales";
import Purchase from "../Models/Purchases";
import moment from "moment";

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





export const getReport = async (req: Request, res: Response) => {
  const { productName, type } = req.query;

  if (!productName || typeof productName !== 'string') {
    return res.status(400).json({ error: 'productName query parameter is required and must be a string' });
  }

  try {
    // Step 1: Find the product by name
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 2: Find sales or purchases based on type
    let transactions;
    if (type === 'sale') {
      transactions = await Sale.find({ productId: product.productId });
    } else if (type === 'purchase') {
      transactions = await Purchase.find({ productId: product.productId });
    } else {
      return res.status(400).json({ error: 'Invalid type. Must be "sale" or "purchase"' });
    }

    res.status(200).json({ product: product.name, transactions });
  } catch (error) {
    console.error('Error fetching product transactions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};