import { Credentials, User, UserAPI } from '../interfaces';
import customFetch from '../utils/axios';

const registerUser = async (user: User): Promise<UserAPI | string> => {
  try {
    const response = await customFetch.post('/auth/register', user);
    return response.data.user;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const loginUser = async (
  credentials: Credentials
): Promise<UserAPI | string> => {
  try {
    const response = await customFetch.post('/auth/login', credentials);
    return response.data.user;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const updateProfile = async (
  user: Partial<UserAPI>,
  token: string
): Promise<UserAPI> => {
  try {
    const response = await customFetch.patch('/auth/updateUser', user, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const userServices = { registerUser, loginUser, updateProfile };

export default userServices;
