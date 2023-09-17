import { UserAPI, Job, JobAPI, JobPagination } from '../interfaces';

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

const isJobArray = (data: any): data is JobPagination => {
  if (Array.isArray(data) && isJob(data[0])) {
    return true;
  }
  return Array.isArray(data);
};

const isJobArrayPaginate = (data: any): data is JobPagination => {
  return (
    data &&
    isJobArray(data.jobs) &&
    typeof data.numOfPages === 'number' &&
    typeof data.totalJobs === 'number'
  );
};

export { isUser, isJob, isJobArray, isJobArrayPaginate };
