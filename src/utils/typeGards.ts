import { UserAPI } from '../interfaces';

const isUser = (data: any): data is UserAPI => {
  return (
    data && typeof data.name === 'string' && typeof data.email === 'string'
  );
};

export { isUser };
