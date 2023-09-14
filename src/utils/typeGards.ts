import { User } from '../interfaces';

const isUser = (data: any): data is User => {
  return (
    data && typeof data.name === 'string' && typeof data.email === 'string'
  );
};

export { isUser };
