import { UserAPI, Job } from '../interfaces';

const isUser = (data: any): data is UserAPI => {
  return (
    data && typeof data.name === 'string' && typeof data.email === 'string'
  );
};

const isJob = (data: any): data is Job => {
  return (
    data &&
    typeof data.position === 'string' &&
    typeof data.company === 'string'
  );
};

export { isUser, isJob };
