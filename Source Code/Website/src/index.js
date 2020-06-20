import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import App from './pages/App';
import Login from './pages/Login'
import Register from './pages/Register'
import Introduction from './pages/Introduction'
import Documentation from './pages/Documentation'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import APIManager from './pages/APIManager'
import Plans from './pages/Plans'

import Dashboard from './pages/Dashboard'
import UserManager from './pages/UserManager'
import UserView from './pages/UserView'
import UserEdit from './pages/UserEdit'
import UserDelete from './pages/UserDelete'
import RequestManager from './pages/RequestManager'
import APIKeyManager from './pages/APIKeyManager'
import APIKeyView from './pages/APIKeyView'
import RequestView from './pages/RequestView'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/dang-nhap" component={Login} />
        <Route path="/dang-ky" component={Register} />
        <Route path="/gioi-thieu" component={Introduction} />
        <Route path="/huong-dan-su-dung-api" component={Documentation} />
        <Route path='/tai-khoan' component={Profile} />
        <Route path='/thay-doi-mat-khau' component={ChangePassword} />
        <Route path='/quan-ly-api' component={APIManager} />
        <Route path='/goi-dich-vu' component={Plans} />

        <Route path='/bang-dieu-khien/tong-quan' component={Dashboard} />
        <Route path='/bang-dieu-khien/nguoi-dung' component={UserManager} exact={true} />
        <Route path='/bang-dieu-khien/nguoi-dung/thong-tin/:id' component={UserView} />
        <Route path='/bang-dieu-khien/nguoi-dung/cap-nhat/:id' component={UserEdit} />
        <Route path='/bang-dieu-khien/nguoi-dung/xoa/:id' component={UserDelete} />
        <Route path='/bang-dieu-khien/request' component={RequestManager} exact={true} />
        <Route path='/bang-dieu-khien/request/:id' component={RequestView} exact={true} />
        <Route path='/bang-dieu-khien/api-key' component={APIKeyManager} exact={true} />
        <Route path='/bang-dieu-khien/api-key/:id' component={APIKeyView} />
        <Route path="/" component={App} />
      </Switch>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
