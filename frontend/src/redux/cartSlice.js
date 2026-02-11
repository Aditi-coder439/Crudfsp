// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i._id === item._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // 1. Increase item quantity
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // 2. Decrease item quantity
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Removes the item if quantity reaches 0
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export the new actions
export const { 
  addToCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;