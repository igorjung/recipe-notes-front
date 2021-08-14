// Dependencies
import React from 'react';
import { Switch } from 'react-router-dom';

// Route
import Route from './Route';

// Pages
import Home from '~/pages/Home';
import Recipe from '~/pages/Recipe/Create';

// import NotFound from '~/pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} isPrivate />
      <Route exact path="/recipes/add" component={Recipe} isPrivate />
      {/* <Route path="*" isDefault component={NotFound} /> */}
    </Switch>
  );
}
