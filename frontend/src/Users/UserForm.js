import React from 'react';
import {Form, Input, Switch, Button, Select} from 'antd';
import {UserRoles} from '../constants/UserRoles';

const {Option} = Select;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8}
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const validateMessages = {
  /* eslint-disable-next-line no-template-curly-in-string */
  required: '${label} is required!',
  types: {
    /* eslint-disable-next-line no-template-curly-in-string */
    email: '${label} is not validate email!'
    /* eslint-disable-next-line no-template-curly-in-string */
  }
};

export function UserForm(props) {
  const {mode, initialValues, onSubmit, onCancel} = props;

  return (
    <Form
      {...layout}
      name='user-form'
      onFinish={onSubmit}
      validateMessages={validateMessages}
      initialValues={initialValues}
    >
      {mode === 'edit' && (
        <Form.Item name={'id'} label='Id'>
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        name={'firstName'}
        label='First name'
        rules={[{required: initialValues && initialValues.role === UserRoles.USER}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'lastName'}
        label='Last name'
        rules={[{required: initialValues && initialValues.role === UserRoles.USER}]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={'email'} label='Email' rules={[{type: 'email'}, {required: true}]}>
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item label='Role' name='role'>
        <Select>
          <Option value={UserRoles.USER}>User</Option>
          <Option value={UserRoles.ADMIN}>Admin</Option>
        </Select>
      </Form.Item>
      <Form.Item label='Enabled' name='enabled' valuePropName='checked'>
        <Switch />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' style={{marginRight: '0.4em'}}>
          Submit
        </Button>
        <Button type='secondary' htmlType='button' onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
