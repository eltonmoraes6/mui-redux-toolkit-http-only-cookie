import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { notesSlice } from './Slices/notesSlice';
import userReducer from './Slices/userSlice';
import { usersSlice } from './Slices/usersSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [notesSlice.reducerPath]: notesSlice.reducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([notesSlice.middleware, usersSlice.middleware]),
  // devTools: false,
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
