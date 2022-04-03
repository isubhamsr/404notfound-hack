import React, { useState } from "react";
import HttpClient from "../../../utlity/HttpClient";
import { useParams, Redirect } from "react-router-dom";
import CustomHelmet from "../../core/CustomHelmet";

export default function ResetPassword({ newPassword }) {
  const { email } = useParams();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const sendResetPasswordMail = async () => {
    setIsSubmit(true);
    try {
      const params = {
        email: data,
      };

      const response = await HttpClient.post("forgetpassword", params);
      if (response.error) {
        setError(true);
        setMessage(response.message);
        setSuccess(false);
        setIsSubmit(false);
      } else {
        setError(false);
        setSuccess(true);
        setMessage(response.message);
        setIsSubmit(false);
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
      setSuccess(false);
      setIsSubmit(false);
    }
  };

  const changePassword = async () => {
    setIsSubmit(true);
    try {
      const params = {
        email: email,
        newpassword: data,
      };

      const response = await HttpClient.put("resetpassword", params);
      if (response.error) {
        setError(true);
        setMessage(response.message);
        setSuccess(false);
        setIsSubmit(false);
      } else {
        setError(false);
        setSuccess(true);
        setMessage(response.message);
        setIsSubmit(false);
        setData("");
        setTimeout(() => {
          setIsRedirect(true);
        }, 1500);
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
      setSuccess(false);
      setIsSubmit(false);
    }
  };

  if (isRedirect) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <React.Fragment>
    <CustomHelmet 
      title={newPassword ? "Create Your New Password" : "Forget Password"}
    />
      <main class="container">
        <div class="starter-template text-center py-5 px-3">
          <h1>
            {newPassword ? "Create Your New Password" : "Forget Password"}
          </h1>
          <p class="lead">
            {!newPassword
              ? "Enter your register email id to get the reset password link"
              : null}
          </p>
        </div>
      </main>
      <div className="d-flex justify-content-center align-items-center">
        <div class="card bg-light" style={{ width: "18rem" }}>
          <div class="card-body">
            {success ? (
              <div class="alert alert-success" role="alert">
                {message}
              </div>
            ) : null}
            {error ? (
              <div class="alert alert-danger" role="alert">
                {message}
              </div>
            ) : null}

            <div class="mb-3">
              <label for="changepassword" class="form-label">
                {newPassword ? "New Password" : "Email address"}
              </label>
              <input
                type={newPassword ? "password" : "email"}
                class="form-control"
                id="changepassword"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder={newPassword ? "New Password" : "name@example.com"}
              />
            </div>
            <button
              type="button"
              class={isSubmit ? "btn btn-primary disabled" : "btn btn-primary"}
              onClick={newPassword ? changePassword : sendResetPasswordMail}
            >
              {isSubmit ? (
                <div class="spinner-border text-light" role="status"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
