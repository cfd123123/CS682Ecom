import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/**
 * Sets the following global variable to default values:<br>
 * >    showEmployeeContent: false,<br>
 * >    showAdminContent: false,<br>
 * >    currentUser: undefined,<br>
 * >    loggedIn: false<br>
 *   This function call is in index.js and is executed when the ReactDOM is
 *   first rendered.
 */
setGlobal({
  showEmployeeContent: false,
  showAdminContent: false,
  currentUser: undefined,
  loggedIn: false,
});

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
