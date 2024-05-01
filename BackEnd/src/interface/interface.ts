import { JwtPayload } from "jsonwebtoken";

export interface ImageId {
  public_id: string;
  url: string;
}

export interface UserID {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  avatar: ImageId[];
  role: string;
  refreshToken: string;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateResetPassword(): string;
}

export interface Reviews {
  _id?: Object;
  name: string;
  rating: number;
  comment: string;
  productId?: string | undefined;
  user: Object;
}

export interface ProductID {
  name: string;
  description: string;
  price: number;
  ratings: number;
  image: ImageId[];
  category: string;
  stock: number;
  user: Object;
  noOfreview: number;
  reviews: Reviews[];
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
