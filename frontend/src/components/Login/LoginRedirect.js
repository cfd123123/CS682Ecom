import React from "react";
import AuthService from "../../services/auth.service";

export default function LoginRedirect(message) {
  const loggedIn = message !== "You are not logged in";

  function logOut() {
    AuthService.logout();
  }

  return (
      <div>
        <header className="jumbotron">
          <h3>
          {message} <p/>
          {loggedIn ?
              <a href="/login" className="login_redirect" onClick={logOut}>
                Click here to log in </a>
              :
              <a href="/login" className="login_redirect">
                Click here to log in </a>
          }
          </h3>
        </header>
      </div>
  )
}
