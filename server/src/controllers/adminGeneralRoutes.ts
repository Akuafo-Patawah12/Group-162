import Orders from "../Models/Orders";
import Notification from "../Models/Notification";
import {Request,Response} from "express"

export const getAllOrders = async (req:Request, res:Response) => {
  try {
    const orders = await Orders.find()
    .populate("customerId","name")
    .sort({ date: -1 }); // newest first

    const result = await Notification.updateMany(
      { read: false },
      { $set: { read: true } }
    );

    
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error while fetching orders.' });
  }
};


export const getUnreadNotifications = async (req:Request, res:Response) => {
  try {
    const unreadNotifications = await Notification.find({ read: false });
    res.status(200).json(unreadNotifications);
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    res.status(500).json({ error: 'Failed to fetch unread notifications' });
  }
};