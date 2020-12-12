import React, {Fragment, useEffect, useState} from 'react';
import {UserForm} from './UserForm';
import {usersService} from '../services/users.service';
import {notification} from 'antd';

export function UserEdit(props) {
  const [user, setUser] = useState();
  const userId = props.match.params.id;

  const redirectToUsersList = () => {
    props.history.push('/users');
  };

  const onSubmit = (data) => {
    usersService.updateUser(data, user.id).then(handleEditSuccess).catch(handleEditError);
  };

  const handleEditSuccess = () => {
    notification.success({
      message: 'Success',
      description: 'User edited successfully!'
    });
    redirectToUsersList();
  };

  const handleEditError = (err) => {
    notification.error({
      message: 'An error has occurred!',
      description: err.message
    });
  };

  const onCancel = () => {
    redirectToUsersList();
  };

  useEffect(() => {
    usersService.getUser(userId).then(setUser);
  }, [userId]);

  return (
    <Fragment>
      {user && (
        <UserForm mode='edit' onSubmit={onSubmit} initialValues={user} onCancel={onCancel} />
      )}
    </Fragment>
  );
}
