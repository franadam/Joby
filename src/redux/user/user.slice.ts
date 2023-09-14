import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Credentials, User } from '../../interfaces';
import { userServices } from '../../services';
import { isUser } from '../../utils/typeGards';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

interface UserState {
  isLoading: boolean;
  user: User | undefined;
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = undefined;
      removeUserFromLocalStorage();
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
        console.log('error reducer', error);
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
        console.log('error reducer', error);
        toast.error(error);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
