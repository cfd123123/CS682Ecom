import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CategoryHeader from "./components/CategoryHeader/CategoryHeader";
// import Cart from './components/Cart'; // <<<<<<< new1_categories
import CategoryResult from './components/CategoryResult'
// import BackImg from './components/img/back-img.jpg';
import ShowingItems from './components/ShowingItems'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faShoppingCart, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
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
import Checkout    from './components/cart/Checkout';
import OrderConfirmation from './components/cart/OrderConfirmation';
import Edit        from './components/Edit';
import Home        from "./components/home.component";
import Show        from './components/Show';
import {CurrentUserContext} from "./CurrentUserContext";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.updateApp = this.updateApp.bind(this);
    // TODO: Find out if using a global variable like this is bad
    window.refresh = this.updateApp;

    this.state = {
      showEmployeeContent: false,
      showAdminContent: false,
      currentUser: undefined,
      loggedIn: false,
    };
  }

  updateApp() {
    const currentUser = UserService.getCurrentUser();
    if (currentUser) {
      this.setState({
        currentUser: currentUser,
        showEmployeeContent: (currentUser.roles && currentUser.roles.filter(role => role.name === "ROLE_EMPLOYEE").length > 0),
        showAdminContent:    (currentUser.roles && currentUser.roles.filter(role => role.name === "ROLE_ADMIN").length > 0),
        loggedIn:            (currentUser.roles && currentUser.roles.filter(role => role.name === "ROLE_CUSTOMER").length > 0),
      });
    } else {
      this.setState({
        currentUser: {
          user: {
            username: "None",
            cart: {},
            roles: []
          },
        }
      })
    }
  }
  componentDidMount() {
    this.updateApp();
  }

  componentWillUnmount() {
    source.cancel("App is unmounting");
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { showEmployeeContent, showAdminContent, currentUser, loggedIn } = this.state;
    if (!currentUser) { return null; }
    return (
        <CurrentUserContext.Provider value={this.state}>
          <Router>
            <div className='global'>
              <div className = 'global_header'>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <Link to={{ pathname: '/' }} className="navbar-brand">Business Name</Link>
                  <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to={{ pathname: '/home' }} className="nav-link">Home</Link>
                    </li>
              {loggedIn && (
                    <li className="nav-item">
                      <Link to={{ pathname: '/mystuff' }} className="nav-link">My Stuff</Link>
                    </li>
              )}
              {showEmployeeContent && (
                    <li className="nav-item">
                      <Link to={{ pathname: '/employee' }} className="nav-link">Employee Content</Link>
                    </li>
              )}
              {showAdminContent && (
                    <li className="nav-item">
                      <Link to={{ pathname: '/admin' }} className="nav-link">Admin Content</Link>
                    </li>
              )}
                  </div>
                  <div className="navbar-nav ml-auto">
                    <SearchBox />

              {loggedIn ? [
                    <li className="nav-item" key={"profile"}>
                      <Link to={{ pathname: '/profile' }} className="nav-link">
                        <FontAwesomeIcon icon={faUserCircle} /> My Account
                      </Link>
                    </li>
              ,
                    <li className="nav-item" key={"logout"}>
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> LogOut
                      </a>
                    </li>
              ] : [
                    <li className="nav-item" key={"login"}>
                    <Link to={{pathname: '/login' }} className="nav-link">
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                  </li>
                ,
                  <li className="nav-item" key={"register"}>
                    <Link to={{pathname: '/register' }} className="nav-link">
                      <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                    </Link>
                  </li>
              ]}
                  <li className="nav-item">
                    <Link to={{ pathname: '/cart' }} className="nav-link">
                      <span><FontAwesomeIcon icon={faShoppingCart} /> Cart</span>
                      <span className="app-size-small">
                        {currentUser.cart && (` (${Object.values(currentUser.cart).reduce((acc, curr) => acc + curr, 0)})`)}
                      </span>
                    </Link>
                  </li>
                </div>
              </nav>
              <CategoryHeader />
            </div>

            <div className="container__homepage">
              <div className="content">
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/home" component={HomePage}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/profile" component={Profile}/>
                  <Route exact path="/mystuff" component={MyStuff}/>
                  <Route exact path="/employee" component={Employee}/>
                  <Route exact path="/admin" component={Admin}/>
                  <Route exact path='/cart' component={Cart}/>
                  <Route exact path='/checkout' component={Checkout}/>
                  <Route exact path='/confirm' component={OrderConfirmation}/>
                  <Route path='/show/:id' component={Show}/>
                  <Route path='/edit/:id' component={Edit}/>
                  <Route path='/create' component={Create}/>
                  <Route path='/Result' component={Result}/>
                  <Route path='/showingItems' component={ShowingItems} />
                  <Route path='/categoryResult' component={CategoryResult} />
                </Switch>
              </div>
            </div>
            <div className = 'homepage__footer'>
              <h1 className = 'contact_us' style={{fontSize: '20px', color: 'white'}}>connect with us</h1>
              <div className = 'contact_email'>
                <span>Fangda.Chi001@umb.edu</span> <br />
                <span>james.michaud001@umb.edu</span> <br/>
                <span>zhenrong.liew001@umb.edu</span>
              </div>
            </div>
            </div>
          </Router>
        </CurrentUserContext.Provider>
    );
  }
}
export default App;
