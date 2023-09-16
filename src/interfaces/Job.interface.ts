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

export type { JobType, JobStatus, Job, JobOptions };
