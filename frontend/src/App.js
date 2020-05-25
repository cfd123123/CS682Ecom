import React from "reactn";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CategoryHeader from "./components/CategoryHeader/CategoryHeader";
import CategoryResult from './components/CategoryResult'
import ShowingItems from './components/ShowingItems'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faShoppingCart, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import OrderConfirmation from './components/cart/OrderConfirmation';
import AuthService from "./services/AuthService";
import UserService from "./services/UserService";
import SearchBox   from "./components/Search/SearchBox";
import Employee    from "./components/Employee";
import HomePage    from './components/HomePage';
import Register    from "./components/Register";
import MyStuff     from "./components/MyStuff";
import Profile     from "./components/MyAccount";
import Create      from './components/Create';
import Result      from './components/Result';
import Admin       from "./components/Admin";
import Login       from "./components/Login/Login";
import Cart        from './components/cart/Cart';
import Checkout    from './components/cart/Checkout';
import Show        from './components/Show';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const currentUser = UserService.getCurrentUser();

    this.setGlobal({
      currentUser: currentUser,
      showEmployeeContent: (currentUser.roles && currentUser.roles.filter(role => role.name === "ROLE_EMPLOYEE").length > 0),
      showAdminContent:    (currentUser.roles && currentUser.roles.filter(role => role.name === "ROLE_ADMIN").length > 0),
      loggedIn:            (currentUser.roles && currentUser.roles.filter(role => role.name === "ROLE_CUSTOMER").length > 0),
    });
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { showEmployeeContent, showAdminContent, currentUser, loggedIn } = this.global;
    if (!currentUser) { return null; }
    // console.log(this.global.currentUser);
    return (
        <Router>
          <div className='global'>
            <div className='global_header'>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={{ pathname: '/home' }} className="navbar-brand">Business Name</Link>
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

         {/* Route settings */}
          <div className="container__homepage">
            <div className="content">
              <Switch>
                <Route exact path="/" component={HomePage}/>
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
                <Route path='/edit/:id' component={Create}/>
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

              <span><img src={"https://lh3.googleusercontent.com/a-/AOh14Gj72w3buSwTcNFkCmDbnUFxg2bYloifAbD3rhkZ=s50-c-k-no"} alt="FD" /> Fangda.Chi001@umb.edu</span>
              <span><img src={"https://ca.slack-edge.com/TU0T2D80L-UU0T2D9E0-7374ac2188e8-48"} alt="JM" /> James.Michaud001@umb.edu</span>
              <span><img src={"https://ca.slack-edge.com/TU0T2D80L-UU0T6FQH2-f610aad4cc26-48"} alt="ZR" /> Zhenrong.Liew001@umb.edu</span>
            </div>
          </div>
          </div>
        </Router>
    );
  }
}
