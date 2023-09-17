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

export type { JobType, JobStatus, Job, JobOptions, JobPagination, JobAPI };
