import React from 'react';
import './App.css';
import {Login} from './Login';
import {Layout} from 'antd';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppHeaderWithRouter} from './AppHeader';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <AppHeaderWithRouter />
        <Layout.Content className='app-content'>
          <Switch>
            <Route path='/login' exact component={Login} />
          </Switch>
        </Layout.Content>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
