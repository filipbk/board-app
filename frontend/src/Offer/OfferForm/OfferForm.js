import React from 'react';
import {Button, Col, Form, Input, Row, Upload} from 'antd';
import './OfferForm.css';

export class OfferForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: undefined,
      content: undefined,
      phoneNumber: undefined,
      price: undefined,
      editMode: false,
      fileList: []
    };
  }

  async onPreview(file) {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  }

  onChange({fileList: newFileList}) {
    this.setState({fileList: newFileList});
  }

  render() {
    const {fileList} = this.state;
    const layout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    };

    return (
      <Row>
        <Col span={20} offset={2}>
          <Form
            {...layout}
            className=''
            onFinish={() => console.log(this.state)}
          >
            <Form.Item
              name='title'
              label='Title'
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
                onChange={(e) => this.setState({title: e.target.value})}
              />
            </Form.Item>
            <Form.Item
              name='phoneNumber'
              label='Phone number'
              rules={[
                {
                  pattern: /\d{9}/,
                  required: true,
                  message: 'Please input your phone number!'
                }
              ]}
            >
              <Input id='phoneNumber' placeholder='Phone number' />
            </Form.Item>
            <Form.Item
              name='price'
              label='Price'
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                  type: 'number'
                }
              ]}
            >
              <Input id='price' placeholder='Price' />
            </Form.Item>

            <Upload
              beforeUpload={() => false}
              listType='picture-card'
              fileList={fileList}
              onPreview={(e) => this.onPreview(e)}
              onChange={(e) => this.onChange(e)}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>

            <Form.Item
              className='btn-wrapper'
              wrapperCol={{...layout.wrapperCol, offset: 8}}
            >
              <Button type='primary' htmlType='submit' className='form-button'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
