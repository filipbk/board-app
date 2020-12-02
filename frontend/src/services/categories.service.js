import {handleResponse} from '../util';

class CategoriesService {
  getAllCategories() {
    const url = process.env.REACT_APP_API_URL;
    return fetch(`${url}/categories`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(handleResponse);
  }
}

const categoriesService = new CategoriesService();
export {categoriesService};
