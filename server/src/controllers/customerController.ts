import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';
import { Sale } from '../models/Sale';
import { Types } from 'mongoose';

const router = Router();

interface OrderRequestBody {
  productId: string;
  customerId: string;
  quantity: number;
}

router.post('', async (req: Request<{}, {}, OrderRequestBody>, res: Response) => {
  const { productId, customerId, quantity } = req.body;

  if (!Types.ObjectId.isValid(productId) || !Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: 'Invalid product or customer ID' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const sale = new Sale({
      productId,
      customerId,
      quantity,
      price: product.price,
    });

    await sale.save();

    product.stock -= quantity;
    await product.save();

    res.status(201).json({ message: 'Order placed successfully', sale });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: (err as Error).message });
  }
});

export default ;
