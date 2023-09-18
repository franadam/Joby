import React from 'react';
import styled from 'styled-components';

interface Props {
  count: number;
  title: string;
  color: string;
  bcg: string;
  icon: JSX.Element;
}

interface StyledProps {
  color: string;
  bcg: string;
}

const StatItem = ({ color, count, title, bcg, icon }: Props): JSX.Element => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <Wrapper color={color} bcg={bcg}>
        <header>
          <span className="count">{count}</span>
          <span className="icon">{icon}</span>
        </header>
        <h5 className="title">{title}</h5>
      </Wrapper>
    </Wrapper>
  );
};

const Wrapper = styled.article<StyledProps>`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    border-radius: var(--borderRadius);
    background: ${(props) => props.bcg};
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

export default StatItem;
