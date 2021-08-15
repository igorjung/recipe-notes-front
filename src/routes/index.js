// Dependencies
import React from 'react';
import { Switch } from 'react-router-dom';

// Route
import Route from './Route';

// Pages
import Home from '~/pages/Home';
import User from '~/pages/User';

import Recipe from '~/pages/Recipe/Create';

import Signup from '~/pages/Auth/signup';
import Signin from '~/pages/Auth/signin';

// import NotFound from '~/pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} isPrivate />
      <Route exact path="/profile" component={User} isPrivate />
      <Route exact path="/recipes/add" component={Recipe} isPrivate />

      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/auth/signin" component={Signin} />
      {/* <Route path="*" isDefault component={NotFound} /> */}
    </Switch>
  );
}
