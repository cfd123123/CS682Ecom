import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

import AuthService from "./services/auth.service";
import SearchBox   from "./components/Search/SearchBox";
import Employee    from "./components/employee.component";
import HomePage    from './components/HomePage';
import Register    from "./components/register.component";
import MyStuff     from "./components/mystuff.component";
import Profile     from "./components/profile.component";
import Create      from './components/Create';
import Result      from './components/Result';
import Admin       from "./components/admin.component";
import Login       from "./components/login.component";
import Cart        from './components/cart/Cart';
import Edit        from './components/Edit';
import Home        from "./components/home.component";
import Show        from './components/Show';
import UserService from "./services/user.service";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.setup = this.setup.bind(this);

    this.state = {
      showEmployeeContent: false,
      showAdminContent: false,
      productsInCart: [],
      currentUser: undefined,
      loggedIn: false
    };
  }

  setup() {
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getProfile(source).then(
          response => {
            this.setState({
              loggedIn: true,
              currentUser: user,
              showEmployeeContent: user.roles.includes("ROLE_EMPLOYEE"),
              showAdminContent: user.roles.includes("ROLE_ADMIN"),
              productsInCart: response.data.cart
            })
          }, error => {
            if (axios.isCancel(error)) {
              console.log('Request canceled');
            } else {
              this.setState({
                content:
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString()
              });
            }
          }
      )
    }
  }

  componentDidMount() {
    this.setup();
  }

  componentWillUnmount() {
    source.cancel("App is unmounting");
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showEmployeeContent, showAdminContent, productsInCart } = this.state;
    // Return null if there's no current user (temporary) to prevent props from being sent empty.
    if (!currentUser) { return null; }
    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={{
                pathname: '/', state: {currentUser: currentUser}
              }} className="navbar-brand">Business Name</Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={{
                    pathname: '/home', state: {currentUser: currentUser}
                  }} className="nav-link">Home</Link>
                </li>

                {currentUser && (
                    <li className="nav-item">
                      <Link to={{
                        pathname: '/mystuff', state: {currentUser: currentUser}
                      }} className="nav-link">My Stuff</Link>
                    </li>
                )}

                {showEmployeeContent && (
                    <li className="nav-item">
                      <Link to={{
                        pathname: '/employee', state: {currentUser: currentUser}
                      }} className="nav-link">Employee Content</Link>
                    </li>
                )}

                {showAdminContent && (
                    <li className="nav-item">
                      <Link to={{
                        pathname: '/admin', state: {currentUser: currentUser}
                      }} className="nav-link">Admin Content</Link>
                    </li>
                )}
              </div>

              <div className="navbar-nav ml-auto">
                <SearchBox/>

                {currentUser ? [
                  <li className="nav-item" key={"profile"}>
                    <Link to={{
                      pathname: '/profile', state: {currentUser: currentUser}
                    }} className="nav-link">My Account</Link>
                  </li>
                  ,
                  <li className="nav-item" key={"logout"}>
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                ] : [
                  <li className="nav-item" key={"login"}>
                    <Link to={{pathname: '/login'}} className="nav-link">Login</Link>
                  </li>
                  ,
                  <li className="nav-item" key={"register"}>
                    <Link to={{pathname: '/register'}} className="nav-link">Sign Up</Link>
                  </li>
                ]}
                <li className="nav-item">
                  <Link to={{
                    pathname: '/cart', state: {currentUser: currentUser, productsInCart: productsInCart}
                  }} className="nav-link">Cart</Link>
                </li>
              </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={HomePage}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/profile" component={Profile}/>
                <Route path="/mystuff" component={MyStuff}/>
                <Route path="/employee" component={Employee}/>
                <Route path="/admin" component={Admin}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/show/:id' component={Show}/>
                <Route path='/edit/:id' component={Edit}/>
                <Route path='/create' component={Create}/>
                <Route path='/Result' component={Result}/>
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
