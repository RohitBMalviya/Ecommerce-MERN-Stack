import { JwtPayload } from "jsonwebtoken";
export interface UserID {
  username?: string;
  email: string;
  password: string;
  confirm_password?: string;
  avatar?: { public_id: string; url: string };
  role: string;
  refreshToken: string;
  refreshTokenExpiry: string;
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface ProductID {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: { public_id: string; url: string }[];
  category: string;
  stock: number;
  noOfreview: number;
  reviews: { name: string; rating: number; comment: string }[];
}

export interface Api {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  error?: { [key: string]: string | number }[]; // OR
  // error?: never[];
  stack?: any;
}

// ***** Extends Interface ***** //
export interface ExtendError extends Error {
  statusCode: number;
  path?: string;
}
export interface ExtendJwtPayload extends JwtPayload {
  _id: string;
}
