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

export interface ProductID {
  _id: string;
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

export interface ProductData {
  data: { Product: ProductID[] };
}
