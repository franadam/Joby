type JobType = 'full-time' | 'part-time' | 'remote' | 'internship';
type JobStatus = 'interview' | 'declined' | 'pending';

interface Job {
  position: string;
  company: string;
  jobLocation: string;
  jobType: JobType;
  status: JobStatus;
}

interface JobOptions {
  jobTypeOptions: JobType[];
  statusOptions: JobStatus[];
  isEditing: boolean;
  editJobId: string;
}

interface JobAPI extends Job {
  createdAt: string;
  _id: string;
}

interface JobPagination {
  jobs: JobAPI[];
  totalJobs: number;
  numOfPages: number;
}

interface JobFilter {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

interface Stats {
  defaultStats: {
    pending: number;
    interview: number;
    declined: number;
  };
  monthlyApplications: { date: string; count: number }[];
}

interface SearchParams {
  page: number;
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
}

export type {
  JobType,
  JobStatus,
  Job,
  JobOptions,
  Stats,
  JobPagination,
  JobAPI,
  JobFilter,
  SearchParams,
};
