import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate to={'/landing'} />;

  return children;
};

export default ProtectedRoute;
