import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Form, RowType } from '.';
import { clearValues, handleFilter } from '../redux/job/job.slice';
import { JobFilter } from '../interfaces';

const SearchContainer = () => {
  const { pagination, isLoading, statusOptions, jobTypeOptions } =
    useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof JobFilter;
    dispatch(handleFilter({ name: key, value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearValues());
  };

  const textItems = [
    {
      type: 'text',
      name: 'search',
      labelText: 'search',
      value: pagination.search,
      handleChange: handleSearch,
    },
  ];

  const selectItems = [
    {
      name: 'searchStatus',
      value: pagination.searchStatus,
      list: ['all', ...(statusOptions || [])],
      labelText: 'status',
      handleChange: handleSearch,
    },
    {
      name: 'searchType',
      value: pagination.searchType,
      list: ['all', ...(jobTypeOptions || [])],
      labelText: 'type',
      handleChange: handleSearch,
    },
    {
      name: 'sort',
      value: pagination.sort,
      list: pagination.sortOptions || [],
      labelText: 'sort',
      handleChange: handleSearch,
    },
  ];

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <Form type={RowType.INPUT} items={textItems} />
          <Form type={RowType.SELECT} items={selectItems} />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
