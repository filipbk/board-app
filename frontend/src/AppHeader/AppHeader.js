import React, {useEffect, useState} from 'react';
import './AppHeader.css';
import {Layout, Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {authenticationService} from '../services';
const {Header} = Layout;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    authenticationService
      .currentUser()
      .subscribe((x) => this.setState({currentUser: x}));
  }

  render() {
    const {currentUser} = this.state;
    let menuItems;

    if (currentUser) {
      menuItems = [
        <Menu.Item data-testid='logout-btn' key='/logout' onClick={this.logout}>
          Logout
        </Menu.Item>,
      ];
    } else {
      menuItems = [
        <Menu.Item key='/login'>
          <Link to='/login'>Login</Link>
        </Menu.Item>,
        <Menu.Item key='/signup'>
          <Link to='/signup'>Signup</Link>
        </Menu.Item>,
      ];
    }

    return (
      <Header className='app-header'>
        <div className='app-title'>
          <Link to='/'>Board App</Link>
        </div>
        <Menu
          className='app-menu'
          mode='horizontal'
          selectedKeys={[this.props.location.pathname]}
        >
          {menuItems}
        </Menu>
      </Header>
    );
  }

  logout() {
    authenticationService.logout();
  }
}

const AppHeaderWithRouter = withRouter(AppHeader);
export {AppHeaderWithRouter, AppHeader};
