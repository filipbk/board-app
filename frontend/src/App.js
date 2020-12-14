import React from 'react';
import './App.css';
import {Login, LoginFailure} from './Login';
import {Layout} from 'antd';
import {Switch, Route} from 'react-router-dom';
import {AppHeader} from './AppHeader';
import {NotFound} from './NotFound';
import {Dashboard} from './Dashboard';
import {PrivateRoute} from './util';
import {AddOffer, EditOffer, Offer} from './Offer';

export class App extends React.Component {
  render() {
    return (
      <Layout>
        <AppHeader />
        <Layout.Content className='app-content'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/login/success/:token' component={Login} />
            <Route exact path='/login/failure' component={LoginFailure} />
            <PrivateRoute exact path='/offer/add' component={AddOffer} />
            <PrivateRoute exact path='/offer/edit/:id' component={EditOffer} />
            <Route exact path='/offer/:id' component={Offer} />
            <Route component={NotFound} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}
