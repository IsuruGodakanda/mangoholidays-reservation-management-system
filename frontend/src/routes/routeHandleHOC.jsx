import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Template from 'components/Template';
import { getSession, SessionKey } from 'services/securityService';
import { validateJWT } from 'redux/actions/AuthActions';

const SetLayout = (props) => {
  const { component: Component } = props;
  return (
    <Route
      render={(routeProps) => (
        <Template>
          <Component {...routeProps} />
        </Template>
      )}
    />
  );
};

const RouteHandleHOC = (props) => {
  const { component: Component, routeType, ...rest } = props;
  const dispatch = useDispatch();

  return routeType === 'protected' ? (
    <Route
      {...rest}
      render={(routeProps) =>
        dispatch(validateJWT()) ? (
          <SetLayout component={Component} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  ) : routeType === 'public' ? (
    <Route
      {...rest}
      render={(routeProps) =>
        dispatch(validateJWT()) ? (
          <Redirect
            to={{
              pathname: getSession(SessionKey.REDIRECT_PATH) ? getSession(SessionKey.REDIRECT_PATH) : '/',
              state: { from: routeProps.location }
            }}
          />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  ) : (
    (dispatch(validateJWT()), (<Route {...rest} render={() => <SetLayout component={Component} />} />))
  );
};

export default RouteHandleHOC;
