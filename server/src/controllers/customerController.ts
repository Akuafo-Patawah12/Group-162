import { Request, Response } from 'express';
import  Product  from '../Models/ProductSchema';
import  Sale  from '../Models/Sales';
import Order  from '../Models/Orders';
import Notification from '../Models/Notification';
import User from '../Models/UserSchema';
import { v4 } from 'uuid';


interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
  };
}

interface OrderRequestBody {
  productId: string;
  customerId: string;
  quantity: number;
}

const createCustomerOrder = async (
  req: AuthenticatedRequest & { body: OrderRequestBody },
  res: Response
)=>{
  const { productId, quantity } = req.body;
  console.log(productId , quantity  )
  console.log(productId, quantity)
  const customerId = req.user?.userId;

  console.log("user id",customerId)

 if (!productId || !quantity || quantity < 1) {
   console.log('Invalid product or quantity')
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

  try {
   const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stockQuantity < quantity) {
      console.log('Insufficient stock')
      return res.status(400).json({ error: 'Insufficient stock' });

    }
     const totalAmount = parseFloat((product.price * quantity).toFixed(2));
    
     const user = await User.findOne({_id: customerId});
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ error: 'User not found' });
    }
    const sale = new Sale({
      saleId: v4(),
      productId,
      customerId,
      quantity,
      unitPrice: product.price,
      totalAmount
    });

    await sale.save();

    const notify = new Notification({
        customerId,
        productId,
        productName: product.name,
        message: `${user.name} made an order. ${quantity} of ${product.name} `,
        read:false
    })
    
    await notify.save();

    product.stockQuantity -= quantity;
    await product.save();

    const order = new Order({
     
      customerId,
      productName: product.name,
      quantity,
      status: 'Pending',
      view:false,
      price:product.price,
      dateOrdered: new Date(),
    });

    const savedOrder = await order.save();
  console.log('Order saved:', savedOrder); 




    res.status(201).json({ message: 'Order placed successfully', sale });
  } catch (err) {
    console.log('Error placing order:', err);
    res.status(500).json({ error: 'Server error', details: (err as Error).message });
  }
};




export const getUserOrder = async (req: AuthenticatedRequest, res: Response)=>{
  const user = req.user?.userId
  try{
     let order = await Order.find({customerId: user })  
     res.status(200).json(order)
  }catch(error){
    return res.status(500).json({message:"Failed to get user",error: error})
  }
}


export const unviewedOrders = async (req: AuthenticatedRequest, res: Response)=> {
  const customerId = req.user?.userId
  try {
    const orders = await Order.find({ customerId,view: false })
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching unviewed orders:', error);
    res.status(500).json({ message: 'Failed to fetch unviewed orders' });
  }
};

export default createCustomerOrder;
