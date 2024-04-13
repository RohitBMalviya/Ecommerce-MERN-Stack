export interface UserID {
  username?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface Api {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  error?: never[];
  stack?: any;
}

export interface ProductID {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: { public_id: string; url: string };
  category: string;
  stock: number;
  noOfreview: number;
  reviews: { name: string; rating: number; comment: string }[];
}
