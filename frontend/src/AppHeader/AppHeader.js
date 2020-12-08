import React from 'react';
import './AppHeader.css';
import {Layout, Menu, Button} from 'antd';
import {Link} from 'react-router-dom';
import {authenticationService} from '../services';
import {history} from '../util';

export class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService
      .currentUser()
      .subscribe((currentUser) => this.setState({currentUser}));
  }

  logout() {
    authenticationService.logout();
    history.push('/');
  }

  redirectToGoogleAuth() {
    const url = process.env.REACT_APP_API_URL;
    window.location.assign(`${url}/auth/google`);
  }

  getLoggedInUserNavbar() {
    return [
      <Menu.Item key='/logout'>
        <Button
          type='link'
          onClick={() => this.logout()}
          className='logout-btn'
        >
          Logout
        </Button>
      </Menu.Item>
    ];
  }

  getNotLoggedInUserNavbar() {
    return [
      <Menu.Item key='/auth/google'>
        <Button
          type='link'
          onClick={this.redirectToGoogleAuth}
          className='login-btn'
        >
          Log in with Google
        </Button>
      </Menu.Item>
    ];
  }

  render() {
    const {currentUser} = this.state;
    let menuItems;

    if (currentUser) {
      menuItems = this.getLoggedInUserNavbar();
    } else {
      menuItems = this.getNotLoggedInUserNavbar();
    }

    return (
      <Layout.Header className='app-header'>
        <div className='app-title'>
          <Link to='/'>Board App</Link>
        </div>
        <Menu
          className='app-menu'
          mode='horizontal'
          selectedKeys={[history.location.pathname]}
        >
          <Menu.Item key='offers'>
            Offers
            <Link to='/offers' />
          </Menu.Item>
          {menuItems}
        </Menu>
      </Layout.Header>
    );
  }
}
