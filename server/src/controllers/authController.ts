import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../Models/UserSchema";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import { v4 } from "uuid";
dotenv.config()
import { SignupRequest, SignupResponse } from "../types/signup.types"; // Adjust the import path as necessary
 

interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Login Function
export const login = async (req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse | { message: string }>) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }) 


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,  // You should set this in your .env
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    const refreshtoken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.REFRESH_TOKEN_SECRET as string,  // You should set this in your .env
      { expiresIn: rememberMe ? "30d": "1h" } // Token expires in 1 hour
    );

    res.cookie("refreshtoken",refreshtoken , {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "none", // Adjust as necessary
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000, // 30 days or 1 hour
    })

    // Return token and user details
    if (user.role === "user") {
      return res.status(200).json({
        token,
        message:"User login successful",
        user: {
          id:  (user._id as mongoose.Types.ObjectId).toString(),
          name: user.name,
          email: user.email,
        },
      });
    }
    if (user.role === "admin") {
    res.status(200).json({
      token,
      message:"Admin login successful",
      user: {
        id:  (user._id as mongoose.Types.ObjectId).toString(),
        name: user.name,
        email: user.email,
      },
    });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const signUp = async (req:any, res:any) => {
    try{
    const { name, email, password } = req.body as SignupRequest;
   console.log(name, email, password )
   const existingUser = await User.findOne({ email }).exec();
   if (existingUser) return res.status(400).json({ message: "User already exists" });
   
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userId: v4(),
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
  
    const token = jwt.sign({ id: newUser._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1h" });
  
    const response: SignupResponse = {
      token,
      user: {
        id:(newUser._id as mongoose.Types.ObjectId).toString(),
        name: newUser.name,
        email: newUser.email,
      },
    };
  
    res.status(201).json(response);
    }catch(err){
        console.log(err)
    }
  };



