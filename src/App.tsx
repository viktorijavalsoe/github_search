import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import { DASHBOARD, LANDING_PAGE, PROFILE_SUMMARY } from './utils/urlRoutes';

const App = () => (
  <Switch>
    <Route exact path={LANDING_PAGE.path} component={LandingPage} />
    <Route exact path={DASHBOARD.path} component={Dashboard} />
    <Route exact path={PROFILE_SUMMARY.path} component={Profile} />
  </Switch>
);

export default App;
