import React, {Fragment, useState, useEffect} from 'react';
import {RequestQueryBuilder} from '@nestjsx/crud-request';
import {usersService} from '../services';
import {UsersTable} from './UsersTable';

const qb = RequestQueryBuilder.create();
const PAGE_SIZE = 1;

export function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  const mapUsersData = (users) =>
    users.map((user) => ({...user, fullName: `${user.firstName} ${user.lastName}`}));

  useEffect(() => {
    const query = qb
      .sortBy({field: 'createdAt', order: 'DESC'})
      .setLimit(PAGE_SIZE)
      .setPage(page)
      .query();

    usersService.getUsersPage(query).then((usersData) => {
      setUsers(mapUsersData(usersData.data));
      setTotalUsersCount(usersData.total);
    });
  }, [page]);

  const onTableChange = (pagination) => {
    console.log({pagination});
  };

  return (
    <Fragment>
      <UsersTable
        data={users}
        page={page}
        pageSize={PAGE_SIZE}
        totalItemsCount={totalUsersCount}
        onChange={onTableChange}
        onPageChange={setPage}
      />
    </Fragment>
  );
}
