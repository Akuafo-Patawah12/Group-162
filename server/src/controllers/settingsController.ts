import { Request, Response } from "express";
import User from "../Models/UserSchema"; // Adjust the path based on your folder structure


interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
  };
}

export interface UserSetting {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
}





// GET /settings
export const getUserSettings = async (
  req: AuthenticatedRequest,
  res: Response<UserSetting[] | { message: string }>
) => {
  try {
    const userId = req.user?.userId;
    console.log("this user",userId)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const activeUser = await User.findOne({_id: userId}).select("name email");

    if (!activeUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSettings: UserSetting[] = [
      { label: "Username", value: activeUser.name, type: "text" },
      { label: "Email", value: activeUser.email, type: "text" },
      { label: "Password", value: true, type: "toggle" }, // This can be based on actual 2FA or similar logic
    ];

    return res.status(200).json(userSettings);
  } catch (error) {
    console.error("Error fetching user settings:", error);
    return res.status(500).json({ message: "Failed to fetch settings" });
  }
};



export const updateUserSetting = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { label } = req.params;
  const { value } = req.body;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update based on the label
    if (label === "Username") {
      user.name = value;
    } else if (label === "Email") {
      user.email = value;
    } else {
      return res.status(400).json({ message: "Invalid setting label" });
    }

    await user.save();

    return res.status(200).json({ message: `${label} updated successfully` });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update setting" });
  }
};