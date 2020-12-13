import React, {Fragment, useState, useEffect} from 'react';
import {RequestQueryBuilder, CondOperator} from '@nestjsx/crud-request';
import {usersService} from '../services';
import {UsersTable} from './UsersTable';

const PAGE_SIZE = 10;

export function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [filters, setFilters] = useState({
    email: {
      condOperator: CondOperator.CONTAINS_LOW
    }
  });

  const mapUsersData = (users) =>
    users.map((user) => ({...user, fullName: `${user.firstName} ${user.lastName}`}));

  useEffect(() => {
    const qb = RequestQueryBuilder.create();
    const usersQb = qb
      .sortBy({field: 'createdAt', order: 'DESC'})
      .setLimit(PAGE_SIZE)
      .setPage(page);

    Object.keys(filters).forEach((filterName) => {
      const filter = filters[filterName];
      if (filter.value && filter.value !== '') {
        usersQb.setFilter({field: filterName, value: filter.value, operator: filter.condOperator});
      }
    });

    usersService.getUsersPage(usersQb.query()).then((usersData) => {
      setUsers(mapUsersData(usersData.data));
      setTotalUsersCount(usersData.total);
    });
  }, [page, filters.email.value, filters]);

  const onSearch = (selectedKeys, dataIndex) => {
    filters[dataIndex].value = selectedKeys[0];
    setFilters({...filters});
  };

  const onSearchReset = (dataIndex) => {
    filters[dataIndex].value = '';
    setFilters({...filters});
  };

  return (
    <Fragment>
      <UsersTable
        {...props}
        data={users}
        page={page}
        pageSize={PAGE_SIZE}
        totalItemsCount={totalUsersCount}
        onPageChange={setPage}
        onSearch={onSearch}
        filters={filters}
        onClearFilters={onSearchReset}
      />
    </Fragment>
  );
}
