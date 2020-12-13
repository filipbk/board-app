import {handleResponse} from '../util';
import {buildQueryUrl} from '../util/query';

class OffersService {
  getOffers(page, pageSize, filters) {
    const url = `${process.env.REACT_APP_API_URL}/offers`;
    const fullURL = buildQueryUrl(url, {page, pageSize, filters});
    return fetch(fullURL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(handleResponse);
  }
}

const offersService = new OffersService();
export {offersService};
