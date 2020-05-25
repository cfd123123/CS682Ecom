import React from "reactn";
import AuthService from "../../services/AuthService";

/**
 * A function that produces a login link if the user is not currently logged in.
 * This function is currently only used by {@link MyStuff} to handle when a
 * user manually enters the URL and is not logged in.
 * @param message - received from the calling component
 * @returns {ReactElement} a link that directs the user to log in
 */
function LoginRedirect(message) {
  const loggedIn = message !== "You are not logged in";

  /**
   * Calls the {@link AuthService#logout} function.
   */
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
export default LoginRedirect;
