import React from 'react';
import {OfferForm} from './OfferForm';
import {offersService} from '../services';
import {notification} from 'antd';

export class AddOffer extends React.Component {
  onSubmit(data) {
    offersService
      .addOffer(data)
      .then(() =>
        notification.success({
          message: 'Success',
          description: 'New offer created successfully'
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
    return <OfferForm editMode={false} onSubmit={this.onSubmit} />;
  }
}
