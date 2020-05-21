import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

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
