import React, {Fragment} from 'react';
import {Card, notification, Spin, Typography} from 'antd';
import {Layout, List} from 'antd';
import {Link} from 'react-router-dom';
import './Dashboard.css';
import {authenticationService, categoriesService} from '../services';
import {history} from '../util';
import {UserRoles} from '../constants/UserRoles';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.checkUserPermissions();
    this.fetchCategories();
  }

  checkUserPermissions() {
    const user = authenticationService.currentUserValue();

    if (user && !user.enabled) {
      history.push(`/login/success/${authenticationService.getUserToken()}`);
    }
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

    return categories.map((item) => (
      <Fragment key={`category-${item.name}`}>
        <Link to={`/offers?cat=${item.name}`}>
          <Card
            className='announcement-card'
            hoverable
            cover={<img alt='example' src={item.imageUrl} style={{padding: '1em 1em 0em 1em'}} />}
            style={{textAlign: 'center'}}
          >
            <Meta title={item.name} />
          </Card>
        </Link>
      </Fragment>
    ));
  }

  render() {
    const {isLoading} = this.state;
    const announcementsCards = this.getCategoriesCards();
    console.log({announcementsCards});

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
            <List
              grid={{gutter: 24, xs: 1, sm: 2, md: 4, lg: 4, xl: 8}}
              dataSource={announcementsCards}
              style={{marginLeft: '5em', marginRight: '5em'}}
              renderItem={(category) => <List.Item>{category}</List.Item>}
            />
          )}
        </Layout>
        {authenticationService.currentUserHasRole(UserRoles.USER) ? (
          <Link to='/offer/add' className='add-offer-link'>
            Add new offer
          </Link>
        ) : null}
      </>
    );
  }
}
