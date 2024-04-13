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
