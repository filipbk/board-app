import React from 'react';
import {OfferForm} from './OfferForm';
import {offersService} from '../../services';
import {notification, Spin} from 'antd';

export class EditOffer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      offerData: {
        title: 'New',
        description: 'Sample text',
        city: 'Wrocław',
        price: 44.4,
        categoryId: 1,
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
    offersService.updateOffer(data, this.props.match.params.id);
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
