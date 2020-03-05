import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Character from '../pages/Character';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/character/:id" component={Character} />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
