import React from "react";
import AuthService from "../../services/auth.service";

export default function LoginRedirect(message) {
  const loggedIn = message !== "You are not logged in";
  // this.logOut = this.logOut.bind(this);
  function logOut() {
    AuthService.logout();
  }

  return (
      <div>
          {message} <p />
        {loggedIn ?
            <a href="/login" className="login_redirect" onClick={logOut}>
              Click here to log in.
            </a>
            :
            <a href="/login" className="login_redirect">
              Click here to log in_
            </a>
        }
      </div>
  )
}
