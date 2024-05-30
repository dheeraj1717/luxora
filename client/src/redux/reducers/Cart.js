import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExists = state.cart.find((i) => i._id === item._id);

    if (isItemExists) {
      state.cart = state.cart.map((i) =>
        i._id === item._id ? { ...i, quantity: item.quantity } : i
      );
    } else {
      state.cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(state.cart));
  },
  removeFromCart: (state, action) => {
    const itemIdToRemove = action.payload;
    state.cart = state.cart.filter((item) => item._id !== itemIdToRemove);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
  },
});
