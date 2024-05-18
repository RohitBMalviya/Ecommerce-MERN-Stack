import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Features/product.Reducer";
import { apiSlice } from "./Products/product.api";

export const store = configureStore({
  reducer: {
    productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
