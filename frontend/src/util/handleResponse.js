import {authenticationService} from '../services';

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = (text && JSON.parse(text)) || response.statusText;

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        authenticationService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
