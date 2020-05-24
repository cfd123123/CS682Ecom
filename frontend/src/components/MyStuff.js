import React from "reactn";
import UserService from "../services/UserService";
import LoginRedirect from "./Login/LoginRedirect";

export default class MyStuff extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getMyStuff().then(
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
    const {currentUser, loggedIn} = this.global;
    const {content} = this.state;
    if (!(content && currentUser)) { return null; }
    console.log(content);

    return (
        <div className="container">
            {!loggedIn ? LoginRedirect(content) :
                <header className="jumbotron">
                  <h3>{content}</h3>
                </header>
            }
        </div>
    );
  }
}
