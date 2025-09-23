import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/userSlice'; 
import cartReducer from '../Slice/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart:cartReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;