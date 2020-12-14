import React from 'react';
import {Row, Col, Select, Input} from 'antd';

export function OfferFilters(props) {
  const {onCategoryChange, onSearch, categories} = props;

  return (
    <Row style={{marginBottom: '2em', textAlign: 'center'}}>
      <Col span={9} offset={7}>
        <Input.Search
          id='search'
          placeholder='What are you looking for?'
          onSearch={onSearch}
          size='large'
          enterButton
        />
      </Col>
      <Col span={3} offset={2}>
        <Select
          id='category-select'
          style={{width: 160}}
          size='large'
          onChange={onCategoryChange}
          allowClear
        >
          {categories.map((category) => (
            <Select.Option key={category.name}>{category.name}</Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
}
