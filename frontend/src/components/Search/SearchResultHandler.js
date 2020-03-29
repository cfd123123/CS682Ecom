import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";

export class SearchResultHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
      searchKeyword: this.props.searchKeyword
    };
  }

  render() {
    var { products } = this.state.products;
    return (
      <div>
        <ReactTable
          data={products}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "Product Name",
                  accessor: "name"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Short Description",
                  accessor: "shortDescription"
                },
                {
                  Header: "Image",
                  Cell: (row) => {
                    return <div><img height={34} src=''/></div>
                  },
                  id: "image"
                },
                {
                  Header: "Price",
                  accessor: "price"
                },
                {
                  Header: "Quantity",
                  accessor: "quantity"
                }
              ]
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default SearchResultHandler;
