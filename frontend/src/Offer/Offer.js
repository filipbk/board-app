import React from 'react';
import {authenticationService, offersService} from '../services';
import {Col, notification, Row, Spin, Typography, Button} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {history} from '../util';
import {UserRoles} from '../constants/UserRoles';

export class Offer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offerData: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchOfferData();
  }

  fetchOfferData() {
    this.setState({isLoading: true});

    offersService
      .getOffer(this.props.match.params.id)
      .then((result) => {
        this.setState({offerData: result, isLoading: false});
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message || error
        });
        this.setState({isLoading: false});
      });
  }

  deleteOffer() {
    offersService
      .deleteOffer(this.props.match.params.id)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Offer deleted successfully'
        });
        history.push('/');
      })
      .catch((error) =>
        notification.error({
          message: 'Error',
          description: error.message || error
        })
      );
  }

  hasEditPermissions() {
    const {offerData} = this.state;

    const isCurrentUserAuthor =
      authenticationService.currentUserValue() &&
      authenticationService.currentUserValue().id === offerData.author.id;

    return isCurrentUserAuthor || authenticationService.currentUserHasRole(UserRoles.ADMIN);
  }

  getFormattedPrice(price) {
    if (price) {
      return `${price.toFixed(2)} zł`;
    }

    return 'FREE';
  }

  render() {
    const {offerData, isLoading} = this.state;
    const url = process.env.REACT_APP_API_URL;

    if (isLoading || !offerData) {
      return <Spin className='loader' size='large' />;
    }

    if (offerData && !offerData.id) {
      return <Redirect to='/notfound' />;
    }

    return (
      <>
        <Typography.Title level={1} className='offer-title'>
          {offerData.title}
        </Typography.Title>
        <Row gutter={4}>
          <Col span={12} className='offer-info'>
            {this.hasEditPermissions() ? (
              <Row gutter={4} className='btns-container'>
                <Col span={12}>
                  <Link
                    className='edit-offer-link'
                    to={`/offer/edit/${this.props.match.params.id}`}
                  >
                    Edit
                  </Link>
                </Col>
                <Col span={12}>
                  <Button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this offer?'))
                        this.deleteOffer();
                    }}
                    className='delete-offer'
                    danger
                    type='primary'
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ) : null}
            <Typography.Text strong={true}>Category:</Typography.Text>{' '}
            <Typography.Text id='categoryName'>{offerData.category.name}</Typography.Text>
            <br />
            <Typography.Text strong={true}>City:</Typography.Text>{' '}
            <Typography.Text>{offerData.city}</Typography.Text>
            <br />
            <Typography.Text strong={true}>Price:</Typography.Text>{' '}
            <Typography.Text>{this.getFormattedPrice(offerData.money)}</Typography.Text>
            <br />
            <Typography.Text strong={true}>Description:</Typography.Text>{' '}
            <Typography.Text>{offerData.description}</Typography.Text>
            <br />
          </Col>
          <Col span={12}>
            {offerData.image ? (
              <img
                className='offer-photo'
                src={`${url}/offers/photo/${offerData.image}`}
                alt='Item offer'
              />
            ) : null}
          </Col>
        </Row>
      </>
    );
  }
}
