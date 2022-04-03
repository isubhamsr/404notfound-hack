import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import HttpClient from "../../../utlity/HttpClient";
import Storage from "../../../utlity/Storage";
import { authenticate, isSignIn } from "../../../Helpers/index";
import CustomHelmet from "../../core/CustomHelmet";

export default function Auth({ isSignin = true }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);


  const handleSignup = async (event) => {
    event.preventDefault();

    setIsSubmit(true);

    try {

      const params = {
        name: name,
        username: username,
        email: email,
        password: password,
      };

      try {
        const response = await HttpClient.post("signup", params);

        if (response.error) {
          setError(true);
          setMessage(response.message);
          setIsSubmit(false);
        } else {
          setError(false);
          setSuccess(true);
          setMessage(response.message);
          authenticate("_token", response.token, () => setIsRedirect(true));
          setIsSubmit(false);
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
        setIsSubmit(false);
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
      setIsSubmit(false);
    }
  };

  const handleSignin = async (event) => {
    event.preventDefault();

    setIsSubmit(true);

    try {
      const params = {
        email: email,
        password: password,
      };

      try {
        const response = await HttpClient.post("signin", params);

        if (response.error) {
          setError(true);
          setMessage(response.message);
          setIsSubmit(false);
          setSuccess(false);
        } else {
          
          setError(false);
          
          setIsLogin(true)
          setMessage(response.message);
          authenticate("token", response.token, () => setSuccess(true));
          
          setIsSubmit(false);
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
        setIsSubmit(false);
        setSuccess(false);
      }
    } catch (error) {
      setError(true);
      setSuccess(false);
      setMessage(error.message);
      setIsSubmit(false);
    }
  };

  if (isRedirect) {
    return <Redirect to="/auth/verify" />;
  }

  if (isLogin) {
    if (Storage.get("token") !== undefined) {
      // return <Redirect to="/user" />;
      window.location.href="/user"
    } 
  }

  return (
    <div className="container mt-4">
    <CustomHelmet 
      title={isSignin ? "Sign In" : "Sign Up"}
    />
      <form class="row g-3">
        {isSignin !== true ? (
          <main class="container">
            <div class="starter-template text-center py-5 px-3">
              <h1>User Sign Up</h1>
            </div>
          </main>
        ) : (
          <main class="container">
            <div class="starter-template text-center py-5 px-3">
              <h1>User Sign In</h1>
            </div>
          </main>
        )}
        {error ? (
          <div class="alert alert-danger" role="alert">
            {message}
          </div>
        ) : null}
        {success ? (
          <div class="alert alert-success" role="alert">
            {message}
          </div>
        ) : null}
        {isSignin !== true ? (
          <React.Fragment>
            <div class="col-md-6">
              <label for="validationDefault02" class="form-label">
                Full Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div class="col-md-6">
              <label for="validationDefaultUsername" class="form-label">
                Username
              </label>
              <div class="input-group">
                <span class="input-group-text" id="inputGroupPrepend2">
                  @
                </span>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="inputGroupPrepend2"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </React.Fragment>
        ) : null}
        <div class="col-md-6">
          <label for="validationDefault03" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div class="col-md-6">
          <label for="validationDefault03" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div class="col-12">
          <div class="form-check">
            <label class="form-check-label" for="invalidCheck2">
              {isSignin ? (
                <React.Fragment>
                  Don't Have account? <Link to="/auth/signup">Sign Up</Link>{" "}
                  <br />
                  *Forget Password? <Link to="/changepassword">Click Here</Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Aleady Have account? <Link to="/auth/signin">Sign In</Link>{" "}
                  <br />
                </React.Fragment>
              )}
            </label>
          </div>
        </div>
        <div class="col-12">
          {isSignin ? (
            <React.Fragment>
              <button
                class={
                  isSubmit ? "btn btn-primary disabled" : "btn btn-primary"
                }
                type="submit"
                onClick={handleSignin}
              >
                {isSubmit ? (
                  <div class="spinner-border text-light" role="status"></div>
                ) : (
                  "Sign In"
                )}
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                class={
                  isSubmit ? "btn btn-primary disabled" : "btn btn-primary"
                }
                type="submit"
                onClick={handleSignup}
              >
                {isSubmit ? (
                  <div class="spinner-border text-light" role="status"></div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </React.Fragment>
          )}
        </div>
      </form>
    </div>
  );
}
