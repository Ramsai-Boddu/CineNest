import {  Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import  {AuthRequest}  from "./authRequest";
import 'dotenv/config';

export const authMiddleware = (req: AuthRequest,res: Response,next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("DECODED TOKEN:", decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};