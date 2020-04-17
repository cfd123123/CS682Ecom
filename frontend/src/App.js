import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBox from "./components/Search/SearchBox";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import MyStuff from "./components/mystuff.component";
import Employee from "./components/employee.component";
import Admin from "./components/admin.component";
import Cart from './components/Cart';
import Show from './components/Show';
import Edit from './components/Edit';
import Create from './components/Create';
import HomePage from './components/HomePage';
import Result from './components/Result';


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showEmployeeContent: false,
      showAdminContent: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showEmployeeContent: user.roles.includes("ROLE_EMPLOYEE"),
        showAdminContent: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showEmployeeContent, showAdminContent } = this.state;

    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand">
                Business Name
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                {currentUser && (
                    <li className="nav-item">
                      <Link to={{pathname: '/mystuff', state: { currentUser: currentUser }}} className="nav-link">
                        My Stuff
                      </Link>
                    </li>
                )}

                {showEmployeeContent && (
                    <li className="nav-item">
                      <Link to={"/employee"} className="nav-link">
                        Employee Content
                      </Link>
                    </li>
                )}

                {showAdminContent && (
                    <li className="nav-item">
                      <Link to={"/admin"} className="nav-link">
                        Admin Content
                      </Link>
                    </li>
                )}
              </div>

              <div className="navbar-nav ml-auto">
                <SearchBox />

                {currentUser ? [
                  <li className="nav-item" key={"profile"}>
                    <Link to={{pathname: '/profile', state: { currentUser: currentUser }}} className="nav-link">
                      My Account
                      {/*{currentUser.username}*/}
                    </Link>
                  </li>,
                  <li className="nav-item" key={"logout"}>
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                ] : [
                  <li className="nav-item" key={"login"}>
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>,
                  <li className="nav-item" key={"register"}>
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                ]}
                <li className="nav-item">
                  <Link to={"/cart"} className="nav-link">
                    Cart
                  </Link>
                </li>
              </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                <Route exact path={["/"]} component={Home} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/mystuff" component={MyStuff} />
                <Route path="/employee" component={Employee} />
                <Route path="/admin" component={Admin} />
                <Route path='/cart' component={Cart} />
                <Route path='/show/:id' component={Show} />
                <Route path='/edit/:id' component={Edit} />
                <Route path='/create' component={Create} />
                <Route path='/Result' component={Result} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;



// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import axios from 'axios';
//
// class App extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: []
//     };
//   }
//
//   componentDidMount() {
//     axios.get('/products/all')
//         .then(res => {
//           this.setState({ products: res.data });
//           console.log(this.state.products);
//         });
//   }
//
//   render() {
//     return (
//         <div class="container">
//           <div class="panel panel-default">
//             <div class="panel-heading">
//               <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
//               <Link to="/Result">
//               <input type="button" className="search_btn" onClick='search'/>
//               </Link>
//             </div>
//             <div class="panel-body">
//               <h6 align="right"><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Product</Link></h6>
//               <h5 class="panel-title" >
//                 PRODUCTS LIST (test)
//               </h5>
//               <table class="table table-stripe">
//                 <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {this.state.products.map(c =>
//                     <tr>
//                       <td>{c.name}</td>
//                       <td>{c.shortDescription}</td>
//                       <td>{c.price}</td>
//                       <td>{c.quantity}</td>
//                       <td><Link to={`/show/${c.id}`} ><Button variant="outline-info" size="sm">Edit</Button></Link></td>
//                     </tr>
//                 )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//     );
//   }
// }
//
// export default App;
