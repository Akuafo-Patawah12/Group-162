import { Request, Response } from 'express';
import  Product  from '../Models/ProductSchema';
import  Sale  from '../Models/Sales';
import Order  from '../Models/Orders';
import { v4 } from 'uuid';
import { Types } from 'mongoose';



interface OrderRequestBody {
  productId: string;
  customerId: string;
  quantity: number;
}

const getCustomerOrder = async (req: Request<{}, {}, OrderRequestBody>, res: Response) => {
  const { productId, customerId, quantity } = req.body;

  if (!Types.ObjectId.isValid(productId) || !Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: 'Invalid product or customer ID' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const sale = new Sale({
      productId,
      customerId,
      quantity,
      price: product.price,
    });

    await sale.save();

    product.stockQuantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Order placed successfully', sale });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: (err as Error).message });
  }
};


export const createSale = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

    // Find product by its productId (not _id)
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const unitPrice = product.price;
    const totalAmount = parseFloat((unitPrice * quantity).toFixed(2));

    // Decrease stock
    product.stockQuantity -= quantity;
    await product.save();

    const newSale = await Sale.create({
      saleId: v4(),
      productId,
      quantity,
      unitPrice,
      totalAmount,
    });

    return res.status(201).json({ message: 'Sale recorded', sale: newSale });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default getCustomerOrder;
