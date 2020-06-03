import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Sale from '../pages/Sale';
import Products from '../pages/Product';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/venda" component={Sale} />
    <Route path="/produto" component={Products} />
  </Switch>
);

export default Routes;
