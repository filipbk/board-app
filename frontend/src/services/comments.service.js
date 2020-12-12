import {authenticationHeader, handleResponse} from '../util';

class CommentsService {
  getOfferComments(id) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/comments/${id}`, {
      method: 'GET',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  getOfferCommentsForAuthor(id) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/comments/${id}/all`, {
      method: 'GET',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  addComment(commentBody) {
    const url = process.env.REACT_APP_API_URL;

    return fetch(`${url}/comments`, {
      body: JSON.stringify(commentBody),
      method: 'POST',
      headers: authenticationHeader()
    }).then(handleResponse);
  }
}

const commentsService = new CommentsService();
export {commentsService};
