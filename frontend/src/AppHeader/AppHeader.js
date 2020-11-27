import React from 'react';
import './AppHeader.css';
import {Layout, Menu, Button} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {authenticationService} from '../services';
const {Header} = Layout;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    authenticationService
      .currentUser()
      .subscribe((currentUser) => this.setState({currentUser}));
  }

  render() {
    const {currentUser} = this.state;
    let menuItems;

    if (currentUser) {
      menuItems = [
        <Menu.Item key='/logout'>
          <Button type='link' onClick={this.logout} className='logout-btn'>
            Logout
          </Button>
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key='/auth/google'>
          <Button type='link' onClick={this.redirectToGoogleAuth} className='logout-btn'>
            Log in
          </Button>
        </Menu.Item>,
        <Menu.Item key='/signup'>
          <Link to='/signup'>Signup</Link>
        </Menu.Item>
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

  redirectToGoogleAuth() {
    fetch('auth/google', {
      crossDomain:true,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}

const AppHeaderWithRouter = withRouter(AppHeader);
export {AppHeaderWithRouter, AppHeader};
