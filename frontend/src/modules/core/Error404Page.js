import React from "react";
import { Link } from 'react-router-dom'

export default function Error404Page() {
  return (
    <body class="d-flex h-100 text-center ">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main class="px-3">
          <h1>Oops You're Lost</h1>
          <p class="lead">
            404 not found
          </p>
          <p class="lead">
            <Link to="/" class="btn btn-lg btn-primary fw-bold">
              Go to Home
            </Link>
          </p>
        </main>
      </div>
    </body>
  );
}
