import React, { useState } from 'react';
import styled from 'styled-components';

import { BarChart, AreaChart } from './';

export interface ChartProps {
  applications: {
    date: string;
    count: number;
  }[];
}

const ChartsContainer = ({ applications }: ChartProps): JSX.Element => {
  const [isBarChart, setIsBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Montly Appication</h4>
      <button type="button" onClick={() => setIsBarChart(!isBarChart)}>
        {isBarChart ? 'Area chart' : 'Bar chart'}
      </button>
      {isBarChart ? (
        <BarChart applications={applications} />
      ) : (
        <AreaChart applications={applications} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default ChartsContainer;
