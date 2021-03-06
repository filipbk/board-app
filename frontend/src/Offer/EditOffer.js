import React from 'react';
import {authenticationService, offersService} from '../services';
import {notification, Spin} from 'antd';
import {OfferForm} from './OfferForm';
import {history} from '../util';
import {UserRoles} from '../constants/UserRoles';

export class EditOffer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

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
        this.checkUserPermissions(result.author.id);
        const url = process.env.REACT_APP_API_URL;

        result.fileList = result.image
          ? [{url: `${url}/offers/photo/${result.image}`, uid: '-1'}]
          : [];
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

  checkUserPermissions(authorId) {
    if (
      !(
        authorId === authenticationService.currentUserValue().id ||
        authenticationService.currentUserHasRole(UserRoles.ADMIN)
      )
    ) {
      this.showErrorMessage("You can't edit requested offer");
      history.push('/');
    }
  }

  onSubmit(data, image) {
    this.uploadImage(image)
      .then((imagePath) => this.updateOffer(data, imagePath))
      .then(this.showSuccessMessage)
      .catch(this.showErrorMessage);
  }

  updateOffer(data, imagePath) {
    data.image = imagePath;
    data.version = this.state.offerData.version;
    return offersService.updateOffer(data, this.props.match.params.id);
  }

  uploadImage(image) {
    if (image && image.url) {
      return Promise.resolve(image.url.substr(image.url.indexOf('photo/') + 6));
    }
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
      description: 'Offer edited successfully'
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
    const {offerData, isLoading} = this.state;

    if (isLoading) {
      return <Spin className='loader' size='large' />;
    }

    return <OfferForm editMode={true} onSubmit={this.onSubmit} data={offerData} />;
  }
}
