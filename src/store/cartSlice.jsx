import { createSlice } from "@reduxjs/toolkit";

const localstorageData = () => {
  const data = localStorage.getItem("food")
    ? JSON.parse(localStorage.getItem("food"))
    : [];
  return data;
};

const initialState = {
  cartItem: localstorageData(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItem.findIndex(
        (index) => index.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItem[productIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.unshift(tempProduct);
      }

      localStorage.setItem("food", JSON.stringify(state.cartItem));
    },

    DEC_TO_CART(state, action) {
      const productIndex = state.cartItem.findIndex(
        (index) => index.id === action.payload.id
      );

      if (state.cartItem[productIndex].cartQuantity > 1) {
        state.cartItem[productIndex].cartQuantity -= 1;
      } else if (state.cartItem[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItem = newCartItem;
      }
      localStorage.setItem("food", JSON.stringify(state.cartItem));
    },
  },
});

export const { ADD_TO_CART, DEC_TO_CART } = cartSlice.actions;
export const selectCartItem = (state) => state.cart.cartItem;

export default cartSlice.reducer;
