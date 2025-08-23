import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from 'auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { store };
