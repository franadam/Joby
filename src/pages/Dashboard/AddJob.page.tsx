import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Wrapper from '../../utils/DashboardFormWrapper';
import { Job } from '../../interfaces';
import {
  clearValues,
  createJob,
  handleChange,
  updateJob,
} from '../../redux/job/job.slice';
import { Form, RowType } from '../../components';

const AddJob = (): JSX.Element => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useAppSelector((state) => state.job);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    //console.log('isEditing', isEditing);
    if (isEditing) {
      const updates = {
        position,
        jobType,
        company,
        jobLocation,
        status,
      };
      dispatch(
        updateJob({
          editJobId,
          updates,
        })
      );
    }
    if (!isEditing)
      dispatch(createJob({ position, jobType, company, jobLocation, status }));
  };

  const handleJobChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof Job;
    dispatch(handleChange({ name: key, value }));
  };

  const clear = () => {
    dispatch(clearValues());
  };

  const textItems = [
    {
      type: 'text',
      name: 'position',
      labelText: 'position',
      value: position,
      handleChange: handleJobChanges,
    },
    {
      type: 'text',
      name: 'jobLocation',
      labelText: 'job Location',
      value: jobLocation,
      handleChange: handleJobChanges,
    },
    {
      type: 'text',
      name: 'company',
      labelText: 'company',
      value: company,
      handleChange: handleJobChanges,
    },
  ];

  const selectItems = [
    {
      name: 'status',
      value: status,
      list: statusOptions,
      labelText: 'status',
      handleChange: handleJobChanges,
    },
    {
      name: 'jobType',
      value: jobType,
      list: jobTypeOptions,
      labelText: 'job Type',
      handleChange: handleJobChanges,
    },
  ];

  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>{isEditing ? 'Edit job' : 'Add job'}</h3>

        <div className="form-center">
          <Form type={RowType.INPUT} items={textItems} />
          ../assets/
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={clear}
            >
              clear
            </button>
            <button type="submit" className="btn btn-block submit-btn">
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
