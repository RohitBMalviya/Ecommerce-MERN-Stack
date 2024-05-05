import { JwtPayload } from "jsonwebtoken";

export type ImageId = {
  public_id: string;
  url: string;
};

export type Reviews = {
  _id?: Object;
  name: string;
  rating: number;
  comment: string;
  productId?: string | undefined;
  user: Object;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phoneNo: string;
};

export type OrderItems = {
  name: string;
  price: string;
  quantity: string;
  image: string;
  product: Object;
};

export type PaymentInfo = {
  id: string;
  status: string;
};

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

export interface OrderID {
  shippingInfo: ShippingInfo;
  orderItems: OrderItems[];
  user: Object;
  paymentInfo: PaymentInfo;
  paidAt: Date;
  itemsPrice: Number;
  taxPrice: Number;
  shippingPrice: Number;
  totalPrice: Number;
  shippingStatus:string,
  createdAt:Date
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
