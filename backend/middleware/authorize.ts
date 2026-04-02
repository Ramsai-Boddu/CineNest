import { Request, Response, NextFunction } from "express";
import {AuthRequest}  from "./authRequest";


export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("USER IN isAdmin:", req.user); // 👈 debug

  if (req.user?.role?.toLowerCase() === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Admins only.",
  });
};