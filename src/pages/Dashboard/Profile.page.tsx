import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Form, FormRow } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateProfile } from '../../redux/user/user.slice';
import Wrapper from '../../utils/DashboardFormWrapper';
import { RowType } from '../../components/Form.component';

const Profile = (): JSX.Element => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  };
  const [userData, setUserData] = useState(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { lastName, location, email, name } = userData;
    if (!email || !lastName || !location || !name) {
      toast.error('Please fill out all fields');
      return;
    }
    dispatch(updateProfile({ ...userData }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const formItems = [
    {
      type: 'text',
      name: 'name',
      labelText: 'name',
      value: userData.name,
      handleChange,
    },
    {
      type: 'text',
      name: 'location',
      labelText: 'location',
      value: userData.location,
      handleChange,
    },
    {
      type: 'text',
      name: 'email',
      labelText: 'email',
      value: userData.email,
      handleChange,
    },
    {
      type: 'text',
      name: 'lastName',
      labelText: 'last Name',
      value: userData.lastName,
      handleChange,
    },
  ];

  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>profile</h3>

        <div className="form-center">
          <Form type={RowType.INPUT} items={formItems} />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
