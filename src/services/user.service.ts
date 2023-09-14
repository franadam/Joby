import { Credentials, User } from '../interfaces';
import customFetch from '../utils/axios';

const registerUser = async (user: User): Promise<User | string> => {
  try {
    const response = await customFetch.post('/auth/register', user);
    return response.data.user;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const loginUser = async (credentials: Credentials): Promise<User | string> => {
  try {
    const response = await customFetch.post('/auth/login', credentials);
    return response.data.user;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const userServices = { registerUser, loginUser };

export default userServices;
