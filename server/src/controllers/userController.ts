import { Request, Response } from 'express';
import User from '../Models/UserSchema'; // Adjust the path based on your folder structure


interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};



export const getLoggedInUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    

    const user = await User.findOne({userId : req.user.id}).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


