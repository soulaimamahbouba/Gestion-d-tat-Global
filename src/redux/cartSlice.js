import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

// Recalcule les totaux à partir des items (Immer permet la mutation directe)
const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      recalculateTotals(state);
    },

    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }

      recalculateTotals(state);
    },

    clearCart: () => initialState,
  },
});

// Actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalCount = (state) => state.cart.totalCount;
export const selectTotalPrice = (state) => state.cart.totalPrice;

// Reducer
export default cartSlice.reducer;