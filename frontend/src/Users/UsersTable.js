/* eslint react/display-name: 0 */ // --> OFF

import React from 'react';
import {CheckOutlined, CloseOutlined, SearchOutlined} from '@ant-design/icons';
import {Table} from 'antd';
import Highlighter from 'react-highlight-words';
import {TableSearchDropdown} from '../components/Table/TableSearchDropdown';

export function UsersTable(props) {
  const {
    data,
    totalItemsCount,
    page,
    pageSize,
    onPageChange,
    filters,
    onClearFilters,
    onSearch
  } = props;
  let searchInput = null;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: (options) => (
      <TableSearchDropdown
        {...options}
        handleSearch={handleSearch}
        handleReset={handleReset}
        setSearchInput={(value) => (searchInput = value)}
        dataIndex={dataIndex}
      />
    ),
    filterIcon: (filtered) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      filters && filters[dataIndex] && filters[dataIndex].value ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[filters[dataIndex].value]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    onSearch && onSearch(selectedKeys, dataIndex);
  };

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    onClearFilters && onClearFilters(dataIndex);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (value) => {
        return value ? <CheckOutlined /> : <CloseOutlined />;
      }
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        total: totalItemsCount,
        showQuickJumper: true,
        pageSize: pageSize,
        current: page,
        showTotal: (total) => `Total ${total} items`,
        onChange: onPageChange
      }}
    ></Table>
  );
}
