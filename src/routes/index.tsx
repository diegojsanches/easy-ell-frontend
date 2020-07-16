import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Sale from '../pages/Sale';
import Products from '../pages/Product';
import SignRoute from './SignRoute';
import AuthRoute from './AuthRoute';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => (
  <Switch>
    <SignRoute path="/signin" exact component={SignIn} />
    <SignRoute path="/signup" exact component={SignUp} />
    <SignRoute path="/reset-password" component={ResetPassword} />
    <SignRoute path="/forgot-password" component={ForgotPassword} />

    <AuthRoute path="/" exact component={Dashboard} isManager />
    <AuthRoute path="/venda" component={Sale} />
    <AuthRoute path="/produto" component={Products} />
  </Switch>
);

export default Routes;
