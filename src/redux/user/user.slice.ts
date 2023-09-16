import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Credentials, User, UserAPI } from '../../interfaces';
import { userServices } from '../../services';
import { isUser } from '../../utils/typeGards';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import { RootState } from '../store';

interface UserState {
  isLoading: boolean;
  user: UserAPI | undefined;
}

const initialState: UserState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: User, thunkAPI) => {
    try {
      const data = await userServices.registerUser(user);
      if (!isUser(data)) throw data;
      return data;
    } catch (error: any) {
      console.log('error reducer', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const data = await userServices.loginUser(credentials);
      if (!isUser(data)) throw data;
      return data;
    } catch (error: any) {
      console.log('error reducer', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/update',
  async (user: Partial<UserAPI>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.user.user?.token;
      if (!token) throw new Error('token missing');
      const data = await userServices.updateProfile(user, token);
      if (!isUser(data)) throw data;
      return data;
    } catch (error: any) {
      const { data, status } = error;
      if (status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Login out');
      }
      return thunkAPI.rejectWithValue(data.msg);
    }
  }
);

type LogoutPayload = string | undefined;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }: PayloadAction<LogoutPayload>) => {
      state.user = undefined;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        const error = payload as string;
        state.isLoading = false;
        console.log('error reducer registerUser', error);
        toast.error(error);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const error = payload as string;
        state.isLoading = false;
        console.log('error reducer loginUser', error);
        toast.error(error);
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`profile saved`);
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        const error = payload as string;
        state.isLoading = false;
        console.log('error reducer updateProfile', error);
        toast.error(error);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
