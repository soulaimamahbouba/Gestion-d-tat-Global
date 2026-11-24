import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { addItem } from './cartSlice';
import { interactiveCartReducer } from './interactiveCart';
import uiReducer, { hideToast, showToast } from './uiSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(showToast(`${action.payload.name} ajouté au panier`));
    await listenerApi.delay(3000);
    listenerApi.dispatch(hideToast());
  },
});

export const interactiveStore = configureStore({
  reducer: {
    cart: interactiveCartReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
