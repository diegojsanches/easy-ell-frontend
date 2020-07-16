import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { useToast } from '../hooks/toast';

interface RouteProps extends ReactDOMRouteProps {
  isManager?: boolean;
  component: React.ComponentType;
}

const AuthRoute: React.FC<RouteProps> = ({
  isManager = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          if (isManager && !user.manager) {
            addToast({
              type: 'error',
              title: 'Impossivel acessar pagina',
              description: 'Area restrita a gerentes',
            });
            return (
              <Redirect
                to={{
                  pathname: '/venda',
                  state: { from: location },
                }}
              />
            );
          }
          return <Component />;
        }
        return (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default AuthRoute;
