import React from 'react';

interface Props {
  isCenter: boolean;
}
const Loading = ({ isCenter }: Props): JSX.Element => {
  return (
    <div className={isCenter ? 'loading loading-center' : 'loading'}></div>
  );
};

export default Loading;
