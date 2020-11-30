import React from "react";
import {Button, Form, Input} from "antd";
import './OfferForm.css'

export class OfferForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: undefined,
      content: undefined,
      phoneNumber: undefined,
      price: undefined,
      editMode: false
    }
  }
  render() {
    return (
      <div className='form-wrapper'>
        <Form className=''>
          <Form.Item
            name='title'
            rules={[
              {
                required: true,
                message: 'Please input offer title!'
              }
            ]}
          >
            <Input
              id='title'
              placeholder='Title'
            />
          </Form.Item>
          <Form.Item
            name='phoneNumber'
            rules={[
              {
                required: true,
                message: 'Please input your phone number!'
              }
            ]}
          >
            <Input
              id='phoneNumber'
              placeholder='Phone number'
            />
          </Form.Item>

          <Form.Item className='btn-wrapper'>
            <Button
              type='primary'
              htmlType='submit'
              className='form-button'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}