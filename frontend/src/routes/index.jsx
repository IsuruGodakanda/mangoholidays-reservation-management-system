import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteHandleHOC from './routeHandleHOC';
import Loader from 'components/Loader';

const SignUp = lazy(() => import('pages/Auth/SignUp'));
const Login = lazy(() => import('pages/Auth/Login'));
const PropertyList = lazy(() => import('pages/Home/PropertyList'));
const Property = lazy(() => import('pages/Home/Property'));
const ReservationList = lazy(() => import('pages/Reservation'));
const NotFound = lazy(() => import('pages/NotFound'));

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <RouteHandleHOC exact path='/signup' routeType='public' component={SignUp} />
        <RouteHandleHOC exact path='/login' routeType='public' component={Login} />
        <RouteHandleHOC exact path='/' routeType='both' component={PropertyList} />
        <RouteHandleHOC exact path='/property/:id' routeType='both' component={Property} />
        <RouteHandleHOC exact path='/reservation' routeType='protected' component={ReservationList} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
