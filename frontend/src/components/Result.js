import React from 'reactn';
import { Link } from 'react-router-dom';
import SearchFunctionality from './Search/SearchFunctionality';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import ProductService from "../services/ProductService";

export default class Result extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: undefined
    };
  }

  componentDidMount() {
    ProductService.getAllProducts().then(res => {
      this.setState({ products: res.data });
    });
  }

  setCase(searched) {
    return searched ? searched.toLowerCase() : "";
  }

  render() {
    const {products} = this.state;
    if (!products) {return null;}
    const searchParams = new URLSearchParams(this.props.location.search);
    const searched = searchParams.get('searched');
    const searched_insensitive_case = this.setCase(searched);
    // console.log(searched);
    return (
        <div className="container">
          <div className="panel-panel-default">
            <div className="panel-heading" />
            <div className="panel-body">
              <div className="add-product-button">
                <Link to="/create"><Button variant="light" size="sm"><FontAwesomeIcon icon={faPlusCircle} /> Add Product</Button></Link>
              </div>
              <h5 className="panel-title" >
                Search results {searched && `for "${searched}"`}
              </h5>
              <SearchFunctionality products={products} searched={searched_insensitive_case} categorySearch={false}/>
            </div>
          </div>
        </div>
    );
  }
}
