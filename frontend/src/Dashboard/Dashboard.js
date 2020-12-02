import React from 'react';
import {Card, Col, notification, Row, Spin, Typography} from 'antd';
import {Layout} from 'antd';
import './Dashboard.css';
import {categoriesService} from '../services';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.setState({isLoading: true});

    categoriesService
      .getAllCategories()
      .then((result) => {
        this.setState({categories: result, isLoading: false});
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message || error
        });
        this.setState({isLoading: false});
      });
  }

  getCategoriesCards() {
    const {Meta} = Card;
    const {categories} = this.state;

    return categories
      .sort(this.sortCategoriesAlphabetically)
      .map((item, key) => (
        <Col key={key}>
          <Card
            className='announcement-card'
            hoverable
            cover={<img alt='example' src={item.imageUrl} />}
          >
            <Meta title={item.name} />
          </Card>
        </Col>
      ));
  }

  sortCategoriesAlphabetically(firstItem, secondItem) {
    if (firstItem.name < secondItem.name) {
      return -1;
    }
    if (firstItem.name > secondItem.name) {
      return 1;
    }
    return 0;
  }

  render() {
    const {isLoading} = this.state;
    const announcementsCards = this.getCategoriesCards();

    return (
      <>
        <Typography.Title level={2} className='dashboard-title'>
          Welcome to the announcement service!
        </Typography.Title>
        <Layout className='categories-container'>
          <Typography.Title level={4}>Categories:</Typography.Title>
          {isLoading ? (
            <Spin size='large' />
          ) : (
            <Row gutter={[16, 16]} justify='space-around'>
              {announcementsCards}
            </Row>
          )}
        </Layout>
      </>
    );
  }
}
