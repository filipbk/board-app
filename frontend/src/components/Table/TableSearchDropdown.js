import React from 'react';
import {Input, Button, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

export function TableSearchDropdown({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  handleSearch,
  handleReset,
  setSearchInput,
  dataIndex
}) {
  return (
    <div style={{padding: 8}}>
      <Input
        ref={(node) => {
          setSearchInput(node);
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{width: 188, marginBottom: 8, display: 'block'}}
      />
      <Space>
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{width: 90}}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size='small' style={{width: 90}}>
          Reset
        </Button>
      </Space>
    </div>
  );
}
