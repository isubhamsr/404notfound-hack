import React from "react";
import { Link } from 'react-router-dom'
import CustomHelmet from "./CustomHelmet";

export default function EmailVerifyPage() {
  return (
    <main class="container">
    <CustomHelmet 
      title="Email Verify"
    />
      <div class="starter-template text-center py-5 px-3">
        <h1>A Email Verification Mail Sent To Your Email</h1>
        <p class="lead">
          Check Your Mail to Verify Your Email (Check Your Span Folder) or
          <br /> <Link to="/auth/signin">Click Here to Sign In</Link>
        </p>
      </div>
    </main>
  );
}
