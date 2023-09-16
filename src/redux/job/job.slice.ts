import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getUserFromLocalStorage } from '../../utils/localStorage';
import { Job, JobType, JobStatus, JobOptions } from '../../interfaces';
import { RootState } from '../store';
import { jobServices } from '../../services';
import { isJob } from '../../utils/typeGards';
import { logoutUser } from '../user/user.slice';

interface JobState extends Job, JobOptions {
  isLoading: boolean;
}

export const initialState: JobState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

interface HandleChangePayload {
  name: keyof JobState;
  value: string | JobType | JobStatus;
}

export const createJob = createAsyncThunk(
  'user/update',
  async (job: Job, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.user.user?.token;
      if (!token) throw new Error('token missing');
      const data = await jobServices.createJob(job, token);
      if (!isJob(data)) throw data;
      console.log('createAsyncThunk', data);
      return data;
    } catch (error: any) {
      const { data, status } = error;
      if (status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Login out');
      }
      console.log('createAsyncThunk', error);
      return thunkAPI.rejectWithValue(data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (
      state: JobState,
      { payload }: PayloadAction<HandleChangePayload>
    ) => {
      const { name, value } = payload;
      console.log('reducer { name, value }', { name, value });
      if (
        typeof value === 'string' &&
        ['position', 'company', 'jobLocation', 'editJobId'].includes(name)
      ) {
        state[name as 'position' | 'company' | 'jobLocation' | 'editJobId'] =
          value;
      } else if (name === 'jobType') {
        state[name as 'jobType'] = value as JobType;
      } else if (name === 'status') {
        state[name as 'status'] = value as JobStatus;
      }
      return state;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.position = payload.position;
        state.company = payload.company;
        state.status = payload.status;
        state.jobType = payload.jobType;
        state.jobLocation = payload.jobLocation;
        toast.success('job created');
      })
      .addCase(createJob.rejected, (state) => {
        state.isLoading = false;
        toast.error('please complete all fields');
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
