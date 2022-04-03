import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Storage from "../../utlity/Storage";
import HttpClient from "../../utlity/HttpClient";

export default function Base({ children }) {
  const [isLogOut, setIsLogOut] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  const history = useHistory();

  const detectToken = () => {
    const token = Storage.get("token");

    if (token !== null || token !== undefined) {
      const decodeToken = Storage.decodeToken("token");
      setUserId(decodeToken._id);
      setName(decodeToken.name);
      setToken(token);
    }
  };

  useEffect(() => {
    detectToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await HttpClient.get(`/logout/${userId}`);

      if (response.error) {
        setError(true);
      } else {
        Storage.delete("token");
        Storage.delete("_token");
        setToken(null);
        setError(false);
        setIsLogOut(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLogOut) {
    history.push("/");
  }

  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            404 Not Found
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
              {token !== null ? (
                <li class="nav-item dropdown">
                  <button
                    class="btn btn-flat btn-flat-icon"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div class="d-flex mr-3">
                      <a href="">
                        <img
                          src={`https://ui-avatars.com/api/?name=${name}&size=210`}
                          alt="user"
                          height="40"
                          width="40"
                          class="img-fluid rounded-circle"
                        />
                      </a>
                    </div>
                  </button>
                  <div
                    class="dropdown-menu dropdown-scale dropdown-menu-right"
                    role="menu"
                  >
                    <button onClick={handleLogout} class="dropdown-item">
                      Log Out
                    </button>
                  </div>
                </li>
              ) : (
                <li class="nav-item">
                  <Link
                    to="/auth/signin"
                    class="btn btn-primary"
                    aria-current="page"
                  >
                    Signin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="children-div">
        <div>{children}</div>
      </main>
      <footer class="container mt-4">
        <p class="float-end">
          <a href="#">Back to top</a>
        </p>
      </footer>
    </React.Fragment>
  );
}
