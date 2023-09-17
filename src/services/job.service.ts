import { Job, JobAPI } from '../interfaces';
import customFetch from '../utils/axios';

const createJob = async (job: Job, token: string): Promise<Job | string> => {
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

const readJobs = async (token: string): Promise<JobAPI[] | string> => {
  try {
    const params = '';
    const response = await customFetch.get('/jobs');
    return response.data;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const updateJob = async (
  id: string,
  token: string,
  updates: Partial<Job>
): Promise<Job | string> => {
  try {
    const response = await customFetch.patch(`/jobs/${id}`, updates);
    console.log('response.data', response.data);
    return response.data.updatedJob;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const deleteJob = async (id: string, token: string): Promise<string> => {
  try {
    const response = await customFetch.delete(`/jobs/${id}`);
    console.log('services response.data', response.data);
    return response.data.msg;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const jobServices = { createJob, readJob, updateJob, deleteJob, readJobs };

export default jobServices;
