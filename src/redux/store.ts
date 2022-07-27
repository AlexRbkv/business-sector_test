import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice/postSlice';
import filterReducer from './filterSlice/filterSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
      post: postReducer,
      filter: filterReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>
  
  type AppDispatch = typeof store.dispatch;
  export const useAppDispatch = () => useDispatch<AppDispatch>();