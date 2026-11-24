import { createAction } from '@reduxjs/toolkit';
import baseCartReducer, { addItem, clearCart, removeItem } from './cartSlice';

const STORAGE_KEY = 'techstore_cart';
const PROMO_CODE = 'POLY2027';

function readSavedItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createInitialState() {
  const items = readSavedItems();
  return {
    items,
    totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    discountPercent: 0,
  };
}

const initialState = createInitialState();

export const applyPromoCode = createAction('interactiveCart/applyPromoCode');

export function interactiveCartReducer(state = initialState, action) {
  if (applyPromoCode.match(action)) {
    return {
      ...state,
      discountPercent: action.payload === PROMO_CODE ? 20 : 0,
    };
  }

  if (![addItem.type, removeItem.type, clearCart.type].includes(action.type)) return state;

  const cartState = baseCartReducer(state, action);
  const updatedState = {
    ...cartState,
    discountPercent: action.type === clearCart.type ? 0 : state.discountPercent,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState.items));
  } catch {
    // The cart remains usable when browser storage is unavailable.
  }

  return updatedState;
}
