import {authenticationHeader, handleResponse} from '../util';
import {authenticationService} from './authentication.service';

class OffersService {
  getOffer(id) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/offers/${id}`, {
      method: 'GET',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  addOffer(offerBody) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/offers`, {
      body: JSON.stringify(offerBody),
      method: 'POST',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  updateOffer(offerBody, id) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/offers/${id}`, {
      body: JSON.stringify(offerBody),
      method: 'PUT',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  uploadPhoto(formData) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/offers/photo`, {
      body: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authenticationService.getUserToken()}`
      }
    }).then(handleResponse);
  }
}

const offersService = new OffersService();
export {offersService};
