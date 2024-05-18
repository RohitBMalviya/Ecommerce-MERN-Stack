import type { ProductData, ProductID } from "@/interface/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  endpoints: (builder) => ({
    fetchProduct: builder.query<ProductData, string | undefined>({
      query: () => `products/readallproduct`,
    }),
  }),
});

export const { useFetchProductQuery } = apiSlice;
