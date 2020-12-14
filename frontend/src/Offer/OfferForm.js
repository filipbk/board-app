import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
  Upload
} from 'antd';
import './OfferForm.css';
import {categoriesService} from '../services';

export class OfferForm extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      title: props.data && props.data.title,
      description: props.data && props.data.description,
      city: props.data && props.data.city,
      money: props.data && props.data.money,
      categoryId: props.data && props.data.category.id,
      editMode: props.editMode,
      fileList: props.data && props.data.fileList ? props.data.fileList : [],
      categories: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCategories();
  }

  fetchCategories() {
    this.setState({isLoading: true});

    categoriesService
      .getAllCategories()
      .then((result) => {
        if (this._isMounted) {
          this.setState({categories: result, isLoading: false});
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message || error
        });
        if (this._isMounted) {
          this.setState({isLoading: false});
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  onFinish(e) {
    const {fileList, money} = this.state;
    const {onSubmit} = this.props;
    const image = fileList.length > 0 ? fileList[0] : null;
    delete e.photos;
    e.money = parseInt(money);
    onSubmit(e, image);
  }

  getCategoriesDropdown() {
    const {categories} = this.state;

    return (
      <Select
        onChange={(value) => this.setState({categoryId: value})}
        id='categoryId'
      >
        {categories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    );
  }

  render() {
    const {
      fileList,
      editMode,
      title,
      city,
      money,
      description,
      categoryId
    } = this.state;
    const layout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    };

    return (
      <>
        <Typography.Title level={2} className='offer-form-title'>
          {editMode ? 'Edit offer' : 'Create new offer'}
        </Typography.Title>
        <Row>
          <Col span={20} offset={2}>
            <Form
              initialValues={{
                title,
                description,
                city,
                money,
                categoryId
              }}
              {...layout}
              className=''
              onFinish={(e) => this.onFinish(e)}
              id='form'
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
                  onChange={(e) => this.setState({title: e.target.value})}
                />
              </Form.Item>

              <Form.Item
                name='categoryId'
                label='Category'
                rules={[
                  {
                    required: true,
                    message: 'Please choose category!'
                  }
                ]}
              >
                {this.getCategoriesDropdown()}
              </Form.Item>

              <Form.Item
                name='description'
                label='Description'
                rules={[
                  {
                    required: true,
                    message: 'Please input description!'
                  }
                ]}
              >
                <Input.TextArea
                  id='description'
                  onChange={(e) => this.setState({description: e.target.value})}
                />
              </Form.Item>

              <Form.Item
                name='city'
                label='City'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Please input your city!'
                  }
                ]}
              >
                <Input
                  id='city'
                  onChange={(e) => this.setState({city: e.target.value})}
                />
              </Form.Item>

              <Form.Item
                name='money'
                label='Price'
                rules={[
                  {
                    pattern: /^\d+?$/,
                    required: true,
                    message: 'Please input price!'
                  }
                ]}
              >
                <Input
                  id='money'
                  onChange={(e) => this.setState({money: e.target.value})}
                />
              </Form.Item>

              <Form.Item name='photos' label='Photos'>
                <Upload
                  beforeUpload={() => false}
                  listType='picture-card'
                  fileList={fileList}
                  onPreview={(e) => this.onPreview(e)}
                  onChange={(e) => this.onChange(e)}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </Form.Item>

              <Form.Item
                className='btn-wrapper'
                wrapperCol={{...layout.wrapperCol, offset: 8}}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  className='form-button'
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
