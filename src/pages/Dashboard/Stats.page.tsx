import React, { useEffect } from 'react';

import { StatsContainer, Loading, ChartsContainer } from '../../components';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getStats } from '../../redux/job/job.slice';

const Stats = (): JSX.Element => {
  const { pagination, isLoading } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStats());
    //console.log('pagination', pagination);
  }, []);

  return (
    <>
      <StatsContainer stats={pagination.defaultStats} />
      {pagination.monthlyApplications.length > 0 && (
        <ChartsContainer applications={pagination.monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
