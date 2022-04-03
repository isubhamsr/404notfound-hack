import React from "react";
import { Route, Redirect } from 'react-router-dom'
import { isSignUp, isSignIn } from '../../../Helpers/index'

export default function SignupRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isSignUp() || isSignIn() ? (
          <Redirect
            to={{
              pathname: "/auth/signin",
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
