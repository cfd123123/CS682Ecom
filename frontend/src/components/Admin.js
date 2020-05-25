import React from "reactn";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";

export default class Admin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminContent().then(
        response => {
          this.setState({
            content: JSON.stringify(response.data)
          });
        },
        error => {
          this.setState({
            content:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });
        }
    );
  }

  render() {
    const {currentUser} = this.global;
    const {content} = this.state;
    if (!(content && currentUser)) { return null; }
    console.log(content);

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>{content}</h3>
          </header>
          <Link to="/create" style={{'float':'left'}}>Add Product</Link>
        </div>
    );
  }
}
