import React from 'react';
import {OfferForm} from './OfferForm';
import {offersService} from '../services';

export class AddOffer extends React.Component {
  onSubmit(data) {
    offersService.addOffer(data);
  }

  render() {
    return <OfferForm editMode={false} onSubmit={this.onSubmit} />;
  }
}
