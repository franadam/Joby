import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

import { Job, Loading } from './';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAllJobs } from '../redux/job/job.slice';

const JobsContainer = () => {
  const { isLoading, pagination } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
    console.log('pagination.jobs', pagination.jobs);
  }, []);

  if (isLoading) {
    return <Loading isCenter />;
  }

  if (pagination.jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>job info</h5>
      <div className="jobs">
        {pagination.jobs.map((job) => {
          return (
            <Job
              key={job._id}
              _id={job._id}
              position={job.position}
              company={job.company}
              jobLocation={job.jobLocation}
              jobType={job.jobType}
              createdAt={job.createdAt}
              status={job.status}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default JobsContainer;
