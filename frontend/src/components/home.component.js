import React, {Component, useState} from "react";

import UserService from "../services/user.service";
import {Link, useHistory} from "react-router-dom";
import {browserHistory} from 'react-router'
import {Button} from 'reactstrap';
import queryString from 'query-string';
import SidebarIcon from './img/side-bar-icon.png'
import SearchIcon from './img/search-icon.png';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      products: [],
      leftSideBar: false,
      searchContent: "",
      toggleLogin: false,
      searchContentPara: ""
    };
  }

  accountLogin() {
    this.setState({
      toggleLogin: !this.state.toggleLogin
    });
  }

  signIn() {
    // sessionStorage.getItem('username') && sessionStorage.getItem('password') ? alert('already login') : history.push('/login')
  }

  cartCheck() {
    // history.push('/cart')
  }

  toggleLeftSidebar() {
    this.setState({
      leftSideBar: !this.state.leftSideBar
    });
  }

  toggleSearchContent(event) {
    this.setState({
      searchContent: event.target.value
    });
  }

  searchContentPara() {
    queryString.stringify({
      content: this.state.searchContent
    });
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      // browserHistory.push(`/Result?${searchContentPara}`)
    }
    console.log('1')
  };


  componentDidMount() {
    UserService.getPublicContent().then(
        response => {
          this.setState({
            products: response.data
          });
        },
        error => {
          this.setState({
            content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
          });
        }
    );
  }

  render() {
    const { content, products, leftSideBar, searchContent, toggleLogin, searchContentPara } = this.state;
    // const history = useHistory();

    return (
        <div className="container">
          {leftSideBar && (
              <div className ='homepage__side-bar'/>
          )}
          <div className='homepage__container'>
            <div className='homepage__header'>
              <div className='homepage__left-part'>
                <img src={SidebarIcon} className='homepage__icon' onClick={this.toggleLeftSidebar}/>
                <b className='homepage__left-part--font'>
                  Ecom
                </b>
              </div>
              <div className='homepage__search--container'>
                <input type='text' className='homepage__search' placeholder="search specific item"
                       onChange={this.toggleSearchContent}
                       onKeyPress={this.handleKeyPress}/>
                       <Link to={`/Result?${this.searchContentPara}`} className="search_btn">
                         <img src={SearchIcon} className='homepage__search--icon'/>
                       </Link>
              </div>
              <ul className='homepage__right-part'>
                <li className='account_Management' onClick={this.accountLogin}>
                  My Account
                  {toggleLogin && (
                      <div className='login__container'>
                        <div className='login__container--sign-in' onClick={this.signIn}> Sign In</div>
                        <div className='login__border'/>
                        <div className='login__container--create'>Create Account</div>
                      </div>
                  )}
                </li>
                <li>
                  Orders
                </li>
                <li className='cart_Management' onClick={this.cartCheck}>
                  Cart
                </li>
              </ul>
            </div>
            <div className='homepage__content' />
            <div className='homepage__footer'>
              <h1 className='contact_us' style={{fontSize: '20px', color: 'white'}}>connect with us</h1>
            </div>
          </div>

          <header className="jumbotron">
            <h3>Products</h3>
              <Link to="/create">
                Add Product
              </Link>
          </header>
          {this.state.content}
          <table className="table table-stripe">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {this.state.products.map(product =>
                <tr key={"productRow"}>
                  <td>{product.name}</td>
                  <td>{product.shortDescription}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Link to={`/show/${product.id}`}>
                    <Button variant="outline-info" size="sm">
                      Edit
                    </Button>
                  </Link>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
    );
  }
}