import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from './user/user.slice';
import sidebarSlice from './sidebar/sidebar.slice';
import jobSlice from './job/job.slice';

export const store = configureStore({
  reducer: { user: userSlice, sidebar: sidebarSlice, job: jobSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
