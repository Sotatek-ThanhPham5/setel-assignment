import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import orderReducers from '../features/order/store/order.reducers';

export const store = configureStore({
  reducer: {
    order: orderReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
