import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './ProductResult.css';
import ProductImage from './../img/empty-product-icon.png';

// const propTypes = {
//   view: PropTypes.string.isRequired,
//   id: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   shortDescription: PropTypes.string,
//   longDescription: PropTypes.string,
//   price: PropTypes.number,
//   quantity: PropTypes.number,
//   image: PropTypes.string,
// };

class ProductResult extends React.Component {
  render() {
    const { view, id, name, shortDescription, longDescription, price, quantity, image } = this.props;
    const listClass = `list-item card ${view}`;
    const style = { zIndex: 100 - this.props.id};

    return (
      <li>
        <span>
            <div className="product-image">
              <Link to={`/show/${id}`} ><img src={ProductImage} className="center" alt={"missingID"}/></Link>
              </div>
              <div className="product-info">
                <h1 className="product-name">{name}</h1>
                <h1 className="product-price">${price.toFixed(2)}</h1>
              </div>
              <h2 className="product-short-description">{shortDescription}</h2>
            <Link to={`/show/${id}`} ><Button className='product-action-button' variant="outline-info" size="sm" >Edit</Button></Link>
        </span>
      </li>
    );
  }
}

export default ProductResult;
