import React from 'react';
import {OfferForm} from './OfferForm';
import {offersService} from '../services';
import {notification} from 'antd';
import {history} from '../util';

export class AddOffer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data, image) {
    this.uploadImage(image)
      .then((imagePath) => this.addOffer(data, imagePath))
      .then(this.showSuccessMessage)
      .catch(this.showErrorMessage);
  }

  addOffer(data, imagePath) {
    if (imagePath) {
      data.image = imagePath;
    }

    return offersService.addOffer(data);
  }

  async uploadImage(image) {
    if (image) {
      const formData = new FormData();
      formData.append('image', image.originFileObj);
      return offersService.uploadPhoto(formData).then((res) => res.filename);
    } else {
      return Promise.resolve(null);
    }
  }

  showSuccessMessage(result) {
    notification.success({
      message: 'Success',
      description: 'New offer created successfully'
    });
    history.push(`/offer/${result.id}`);
  }

  showErrorMessage(error) {
    notification.error({
      message: 'Error',
      description: error.message || error
    });
  }

  render() {
    return <OfferForm editMode={false} onSubmit={this.onSubmit} />;
  }
}
