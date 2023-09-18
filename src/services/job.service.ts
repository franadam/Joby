import { Job, JobAPI, SearchParams } from '../interfaces';
import customFetch from '../utils/axios';

const createJob = async (job: Job): Promise<Job | string> => {
  try {
    const response = await customFetch.post('/jobs', job);
    return response.data.job;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const readJob = async (id: string): Promise<Job | string> => {
  try {
    const response = await customFetch.get(`/jobs/${id}`);
    return response.data.job;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const readJobs = async (params: SearchParams): Promise<JobAPI[] | string> => {
  const { page, search, searchStatus, searchType, sort } = params;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  //console.log('service params', params);
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const getStats = async (): Promise<any | string> => {
  try {
    const response = await customFetch.get('/jobs/stats');
    //console.log('response.data', response.data);
    return response.data;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const updateJob = async (
  id: string,
  updates: Partial<Job>
): Promise<Job | string> => {
  try {
    const response = await customFetch.patch(`/jobs/${id}`, updates);
    //console.log('response.data', response.data);
    return response.data.updatedJob;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const deleteJob = async (id: string): Promise<string> => {
  try {
    const response = await customFetch.delete(`/jobs/${id}`);
    //console.log('services response.data', response.data);
    return response.data.msg;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const jobServices = {
  createJob,
  readJob,
  updateJob,
  deleteJob,
  readJobs,
  getStats,
};

export default jobServices;
