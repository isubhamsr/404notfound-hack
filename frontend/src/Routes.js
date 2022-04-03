import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./modules/auth/components/Auth";
import ResetPassword from "./modules/auth/components/ResetPassword";
import EmailVerifyPage from "./modules/core/EmailVerifyPage";
import User from "./modules/core/User";
import SigninRoute from "./modules/Users/Helpers/SigninRoute";
import SignupRoute from "./modules/Users/Helpers/SignupRoute";

export default function Routes() {
  return (
    <Switch>

      <SigninRoute path="/" exact>
        <Auth />
      </SigninRoute>

      <SigninRoute path="/newpassword/:email" exact>
        <ResetPassword newPassword={true}/>
      </SigninRoute>
      <SigninRoute path="/changepassword" exact>
        <ResetPassword />
      </SigninRoute>

      
      <Route path="/user" exact>
        <User />
      </Route>

      <SigninRoute path="/auth/signin" exact>
        <Auth />
      </SigninRoute>

      <SignupRoute path="/auth/signup" exact>
        <Auth isSignin={false} />
      </SignupRoute>

      <Route path="/auth/verify" exact>
        <EmailVerifyPage />
      </Route>

    </Switch>
  );
}
