import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

export const slice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find((item) => item.productId === action.payload.productId);
      if (item) {
        item.productQuantity += action.payload.productQuantity;
      } else {
        state.productData.push(action.payload);
      }
    },
  },
});

export const { addToCart } = slice.actions;
export default slice.reducer;
