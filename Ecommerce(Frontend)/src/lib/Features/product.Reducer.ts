import { createSlice } from "@reduxjs/toolkit";
import { AllProduct } from "@/enums/enums";

const initialState = {
  product: {
    product: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    product: (state, actions) => {
      switch (actions.type) {
        case AllProduct.ALL_PRODUCT_REQUEST:
          return {
            loading: true,
            product: [],
          };
        case AllProduct.ALL_PRODUCT_SUCCESS:
          return {
            loading: false,
            product: actions.payload.products,
            productsCount: actions.payload.productsCount,
          };
        case AllProduct.ALL_PRODUCT_FAIL:
          return {
            loading: true,
            product: actions.payload,
          };
        case AllProduct.CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
    },
  },
});

export const { product } = productSlice.actions;

export default productSlice.reducer;
