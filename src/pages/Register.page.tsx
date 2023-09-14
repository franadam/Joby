import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { FormRow, Logo } from '../components';
import { User } from '../interfaces';
import { loginUser, registerUser } from '../redux/user/user.slice';
import { useNavigate } from 'react-router-dom';

const initialState: User = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = (): JSX.Element => {
  const [info, setInfo] = useState(initialState);
  const { user, isLoading } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = info;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInfo({ ...info, isMember: !info.isMember });
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h3>{info.isMember ? 'Login' : 'Register'}</h3>

        {!info.isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={info.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          labelText="email"
          value={info.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          labelText="password"
          value={info.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'submit'}
        </button>
        <p>
          {info.isMember ? 'Not a member yet?' : 'Already a member ?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {info.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
