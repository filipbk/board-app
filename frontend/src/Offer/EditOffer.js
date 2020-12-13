import React from 'react';
import {offersService} from '../services';
import {notification, Spin} from 'antd';
import {OfferForm} from './OfferForm';

export class EditOffer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      offerData: {
        title: 'a',
        description: 'b',
        city: 'c',
        money: 4,
        categoryId: 2,
        fileList: [
          {
            uid: '-1',
            url:
              'https://res.cloudinary.com/practicaldev/image/fetch/s--7JhWVWeR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191019-update-item.jpeg'
          }
        ]
      },
      isLoading: false
    };
  }

  componentDidMount() {}

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

  onSubmit(data) {
    offersService.updateOffer(data, this.props.match.params.id)
      .then(() =>
        notification.success({
          message: 'Success',
          description: 'Offer edited successfully'
        })
      )
      .catch((error) =>
        notification.error({
          message: 'Error',
          description: error.message || error
        })
      );
  }

  render() {
    const {offerData, isLoading} = this.state;

    if (isLoading) {
      return <Spin className='loader' size='large' />;
    }

    return (
      <OfferForm editMode={true} onSubmit={this.onSubmit} data={offerData} />
    );
  }
}
