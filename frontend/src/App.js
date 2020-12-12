import React from 'react';
import './App.css';
import {Login, LoginFailure} from './Login';
import {Layout} from 'antd';
import {Switch, Route} from 'react-router-dom';
import {AppHeader} from './AppHeader';
import {NotFound} from './NotFound';
import {Dashboard} from './Dashboard';
import {AddOffer} from './Offer/OfferForm/AddOffer';
import {EditOffer} from './Offer/OfferForm/EditOffer';
import {PrivateRoute} from './util';

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
            <Route component={NotFound} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}
