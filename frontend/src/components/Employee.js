import React from "reactn";
import UserService from "../services/UserService";

export default class Employee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getEmployeeContent().then(
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
        </div>
    );
  }
}
