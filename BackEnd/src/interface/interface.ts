import { JwtPayload } from "jsonwebtoken";
export interface UserID {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  avatar: { public_id: string; url: string };
  role: string;
  refreshToken: string;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateResetPassword(): string;
}

export interface ProductID {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: { public_id: string; url: string }[];
  category: string;
  stock: number;
  user: any;
  noOfreview: number;
  reviews: { name: string; rating: number; comment: string }[];
}

export interface MailOption {
  email?: string;
  from?: string;
  to?: string;
  subject: string;
  message?: string;
  text?: string;
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
  code?: number;
  keyValue?: any;
}
export interface ExtendJwtPayload extends JwtPayload {
  _id: string;
}
