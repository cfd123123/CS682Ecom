import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
// import './App.css';
// import Edit from './components/Edit';
// import Create from './components/Create';
// import Show from './components/Show';
// import Result from './components/Result';
// import HomePage from './components/HomePage';
// import Login from './components/Login/Login';
// import Cart from './components/Cart';
// ReactDOM.render(
//
//   //ReactDOM.render(<MRoute />, document.getElementById('root'));
//   <Router>
//     <div>
//       <Route exact path='/' component={HomePage} />
//       <Route path='/edit/:id' component={Edit} />
//       <Route path='/create' component={Create} />
//       <Route path='/show/:id' component={Show} />
//       <Route path='/Result' component={Result} />
//       <Route path='/App' component={App} />
//       <Route path='/Login' component={Login} />
//       <Route path='/cart' component={Cart} />
//     </div>
//   </Router>,
//   document.getElementById('root')
//
// );
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
