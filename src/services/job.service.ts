import { Job } from '../interfaces';
import customFetch from '../utils/axios';

const createJob = async (job: Job, token: string): Promise<Job | string> => {
  try {
    const response = await customFetch.post('/jobs', job, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
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

const readJobs = async (): Promise<Job | string> => {
  try {
    const response = await customFetch.get('/jobs');
    return response.data.job;
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
    const response = await customFetch.patch(`/jobs/${id}`, updates, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.job;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const deleteJob = async (id: string, token: string): Promise<Job | string> => {
  try {
    const response = await customFetch.delete(`/jobs/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.job;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

const jobServices = { createJob, readJob, updateJob, deleteJob, readJobs };

export default jobServices;
