import * as React from 'react';
import {authenticationService} from "../services";

class Login extends React.Component {
  constructor(props) {
    super(props);

    if(authenticationService.currentUserValue()) {
      this.props.history.push('/');
    }
  }
  render() {
    return <div>Hello world!</div>;
  }
}

export {Login};
