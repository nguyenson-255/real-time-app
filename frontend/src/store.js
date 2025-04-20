// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/slices/authSlice';
import chatReducer from '../src/slices/chatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  }
});

export default store;

