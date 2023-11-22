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
      const item = state.productData.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.productQuantity += action.payload.productQuantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.productData = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.productQuantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.productId === action.payload.productId
      );
      if (item.productQuantity === 1) {
        item.productQuantity = 1;
      } else {
        item.productQuantity--;
      }
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    }
  },
});

export const {
  addToCart,
  deleteProduct,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  addUser,
  removeUser,
} = slice.actions;
export default slice.reducer;
