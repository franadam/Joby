import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getUserFromLocalStorage } from '../../utils/localStorage';
import {
  Job,
  JobType,
  JobStatus,
  JobOptions,
  JobAPI,
  Stats,
  SearchParams,
  JobFilter,
} from '../../interfaces';
import { jobServices } from '../../services';
import { isJob, isJobArrayPaginate } from '../../utils/typeGards';
import { logoutUser } from '../user/user.slice';
import { RootState } from '../store';
import { checkForUnauthorizedResponse } from '../../utils/axios';

interface PaginationState extends JobFilter, Stats {
  jobs: JobAPI[];
  totalJobs: number;
  numOfPages: number;
  page: number;
}

interface JobState extends Job, JobOptions {
  isLoading: boolean;
  pagination: PaginationState;
}

const initialFiltersState: JobFilter = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialPaginationState: PaginationState = {
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  defaultStats: { pending: 0, interview: 0, declined: 0 },
  monthlyApplications: [],
  ...initialFiltersState,
};

export const initialState: JobState = {
  isLoading: true,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
  pagination: initialPaginationState,
};

interface HandleChangePayload {
  name: keyof JobState;
  value: string | JobType | JobStatus;
}

interface HandleFilterPayload {
  name: keyof JobFilter;
  value: string | JobType | JobStatus;
}

export const createJob = createAsyncThunk(
  'job/create',
  async (job: Job, thunkAPI) => {
    try {
      const data = await jobServices.createJob(job);
      if (!isJob(data)) throw data;
      //console.log('createAsyncThunk', data);
      return data;
    } catch (error: any) {
      const { data, status } = error;
      if (status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Login out');
      }
      //console.log('createAsyncThunk', error);
      return checkForUnauthorizedResponse(data.msg, thunkAPI);
    }
  }
);

export const getAllJobs = createAsyncThunk(
  'job/getall',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { page, search, searchStatus, searchType, sort } =
      state.job.pagination;
    const params: SearchParams = {
      page,
      search,
      searchStatus,
      searchType,
      sort,
    };

    try {
      const data = await jobServices.readJobs(params);
      //console.log('createAsyncThunk data', data);
      if (!isJobArrayPaginate(data)) throw data;
      return data;
    } catch (error: any) {
      const { data, status } = error;
      if (status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Login out');
      }
      //console.log('createAsyncThunk error', error);
      return checkForUnauthorizedResponse(data.msg, thunkAPI);
    }
  }
);

export const updateJob = createAsyncThunk(
  'job/update',
  async (
    { editJobId, updates }: { editJobId: string; updates: Job },
    thunkAPI
  ) => {
    try {
      const data = await jobServices.updateJob(editJobId, updates);
      //console.log('updateJob createAsyncThunk data', data);
      if (!isJob(data)) throw data;
      return data;
    } catch (error: any) {
      const { data, status } = error;
      if (status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Login out');
      }
      //console.log('updateJob createAsyncThunk error', error);
      return checkForUnauthorizedResponse(data.msg, thunkAPI);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'job/delete',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const data = await jobServices.deleteJob(id);
      thunkAPI.dispatch(getAllJobs());
      return data;
    } catch (error: any) {
      const { data, status } = error;
      thunkAPI.dispatch(hideLoading());
      if (status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Login out');
      }
      //console.log('createAsyncThunk', error);
      return checkForUnauthorizedResponse(data.msg, thunkAPI);
    }
  }
);

export const getStats = createAsyncThunk('job/stats', async (_, thunkAPI) => {
  try {
    const data = await jobServices.getStats();
    return data;
  } catch (error: any) {
    const { data, status } = error;
    if (status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Login out');
    }
    return checkForUnauthorizedResponse(data.msg, thunkAPI);
  }
});

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (
      state: JobState,
      { payload }: PayloadAction<HandleChangePayload>
    ) => {
      const { name, value } = payload;
      //console.log('reducer { name, value }', { name, value });
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
    handleFilter: (
      state: JobState,
      { payload }: PayloadAction<HandleFilterPayload>
    ) => {
      const { name, value } = payload;
      state.pagination.page = 1;
      //console.log('reducer { name, value }', { name, value });
      if (typeof value === 'string') {
        state.pagination[name as 'search'] = value;
      } else if (name === 'searchType') {
        state.pagination[name as 'searchType'] = value;
      } else if (name === 'searchStatus') {
        state.pagination[name as 'searchStatus'] = value;
      }
      return state;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    changePage: (state, { payload }) => {
      state.pagination.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (isJobArrayPaginate(payload)) {
          state.pagination.jobs = payload.jobs;
          state.pagination.totalJobs = payload.totalJobs;
          state.pagination.numOfPages = payload.numOfPages;
        }
        toast.success('jobs');
      })
      .addCase(getAllJobs.rejected, (state) => {
        state.isLoading = false;
        toast.error('please complete all fields');
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
        state.isEditing = true;
      })
      .addCase(updateJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state = { ...state, ...payload };
        toast.success('job edited');
      })
      .addCase(updateJob.rejected, (state) => {
        state.isLoading = false;
        toast.error('error');
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state = { ...initialState };
        state.isLoading = false;
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state) => {
        state.isLoading = false;
        toast.error('error');
      })
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.pagination.defaultStats = payload.defaultStats;
        state.pagination.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(getStats.rejected, (state) => {
        state.isLoading = false;
        toast.error('error');
      });
  },
});

export const {
  handleChange,
  handleFilter,
  clearValues,
  showLoading,
  hideLoading,
  setEditJob,
  changePage,
} = jobSlice.actions;

export default jobSlice.reducer;
