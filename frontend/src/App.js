import React from 'react';
import './App.css';
import {Login, LoginFailure} from './Login';
import {Layout} from 'antd';
import {Router, Switch, Route} from 'react-router-dom';
import {AppHeaderWithRouter} from './AppHeader';
import {NotFound} from './NotFound';
import {history} from './util/history';

function App() {
  return (
    <Layout>
      <Router history={history}>
        <AppHeaderWithRouter />
        <Layout.Content className='app-content'>
          <Switch>
            <Route exact path='/login/success/:token' component={Login} />
            <Route exact path='/login/failure' component={LoginFailure} />
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </Layout.Content>
      </Router>
    </Layout>
  );
}

export default App;
