import { configureStore } from '@reduxjs/toolkit';
import certificatesReducer from './certificatesSlice';

const store = configureStore({
  reducer: {
    certificates: certificatesReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
