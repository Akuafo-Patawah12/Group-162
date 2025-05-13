import { Request, Response } from "express";
import User from "../Models/UserSchema"; // Adjust the path based on your folder structure


interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
  };
}


// GET /settings
export const getUserSettings = async (req: AuthenticatedRequest, res: Response) => {
    
  try {

    const userId = req.user?.userId; // safely access user ID
     if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const active_user = await User.findOne({userId : userId}).select('-password');
    const userSettings = [
  { label: "Username", value: active_user?.name, type: "text" },
  { label: "Email", value: active_user?.email, type: "text" },
  { label: "Password", value: true, type: "toggle" }, // toggle for example (e.g., 2FA enabled)
];
    res.status(200).json(userSettings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};