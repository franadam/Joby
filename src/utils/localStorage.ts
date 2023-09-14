import { UserAPI } from '../interfaces';

export const addUserToLocalStorage = (user: UserAPI): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = (): UserAPI | undefined => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : undefined;
  return user;
};
