import { configureStore } from '@reduxjs/toolkit';
import reducer from './slice';


const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
}) 

export default store;