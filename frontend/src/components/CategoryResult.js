import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductResult from './Search/ProductResult'

class CategoryResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  componentDidMount() {
    axios.get('/category/all')
        .then(res => {
          this.setState({ products: res.data });
        });
  }



  render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const resultsPara = searchParams.get('results');

    if(!this.state.products)
    {
      return <div/>
    }

    let result =()=> {
      return (
        this.state.products.filter((cate)=> cate.name ===resultsPara )
      )
    }
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
            </div>
            <div className="panel-body">
              <h6 align="left"><Link to="/"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Home</Link></h6>
              <h6 align="right"><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Add Product</Link></h6>
              <h5 className="panel-title" >
                Category results {resultsPara && `for "${resultsPara}"`}
              </h5>

            {
              result()[0].products.map((items)=>{
                  return <ProductResult id={items.id} name={items.name} shortDescription={items.shortDescription} price={items.price} image={items.image}/>
              })
            }



            </div>
          </div>
        </div>
    );
  }
}

export default CategoryResult;
