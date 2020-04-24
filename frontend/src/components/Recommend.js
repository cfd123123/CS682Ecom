import React, { Component } from 'react';
import ProductCard from "./product/ProductCard"
import UserService from "../services/user.service";
import './Recommend.css';
export default class Recommend extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    
  }
  componentDidMount() {
    this._isMounted = true;
    UserService.getPublicContent().then(
      response => {
        if (this._isMounted) {
          this.setState({
           // currentUser: currentUser,
            products: response.data
          });
        }
      },
  );
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
    render() {

        //var item = this.state.products[Math.floor(Math.random()*this.state.products.length)];
        
        var recommendItems = ()=> {
          var newItems=new Array();
          if(this.state.products.length<5)
          {
            return newItems;
          }

          for(var i = 0;i<5;i++){
            newItems.push(this.state.products[Math.floor(Math.random()*this.state.products.length)])
          }
          return newItems;
        }

        console.log(recommendItems ().map(product=>{return product}))  
        const limitedProducts = recommendItems()[0] && recommendItems().map(product => {
              return (<ProductCard key={`${product.id}`} {...product} isHomepage={this.props.isHomepage}/>)

        });

       return(
         
          <div className = "recommend_product" >
          {limitedProducts}
          </div>
          
       )   
    }
  }
