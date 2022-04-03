import React from "react";
import { Route, Redirect } from 'react-router-dom'
import { isSignIn } from '../../../Helpers/index'

export default function SigninRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isSignIn() ? (
          <Redirect
            to={{
              pathname: "/user",
              state: { from: props.location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
