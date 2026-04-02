import { Request } from "express";

interface AuthUser {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}