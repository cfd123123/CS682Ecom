import React from "reactn";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/AuthService";
import isEmail from 'validator/lib/isEmail';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";

/**
 * Notifies the user if they try to register without entering anything into
 * a required text box.
 * @param {string} value the value that is required
 * @returns {ReactElement|null} error message if value is empty and
 * nothing otherwise
 * @memberOf Register
 */
const required = value => {
  if (!value) {
    return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
    );
  }
};

/**
 * Notifies the user if they try to use an invalid email address.
 * @param {string} value the value to be validated
 * @returns {ReactElement|null} error message if value is invalid and
 * nothing otherwise
 * @memberOf Register
 */
const email = value => {
  if (!isEmail(value)) {
    return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
    );
  }
};

/**
 * Notifies the user if they try to use a username of improper length.
 * @param {string} value the value to be validated
 * @returns {ReactElement|null} error message if value is invalid and
 * nothing otherwise
 * @memberOf Register
 */
const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
    );
  }
};

/**
 * Notifies the user if they try to use a password of improper length.
 * @param {string} value the value to be validated
 * @returns {ReactElement|null} error message if value is invalid and
 * nothing otherwise
 * @memberOf Register
 */
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
    );
  }
};

/**
 * Top level component that is register page a user sees when they want to
 * register for an account.
 */
class Register extends React.PureComponent {
  /**
   * Constructs this component with initially empty fields. Also binds the
   * handleRegister, onChangeUsername, onChangeEmail, and onChangePassword
   * functions to this component.
   */
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    /**
     * username - the desired username of the user<br>
     * email - the email address to associate with username<br>
     * password - the password to associate with username<br>
     * successful - was registering successful?<br>
     * message - used to display a message to the user
     */
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  /**
   * Updates the value of username in this component's state
   * @param event - the event that triggered this function call
   */
  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  /**
   * Updates the value of email in this component's state
   * @param event - the event that triggered this function call
   */
  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  /**
   * Updates the value of password in this component's state
   * @param event - the event that triggered this function call
   */
  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  /**
   * Initiates the register process after validating the user's input. If input
   * is valid, this function calls the {@link AuthService#register} function,
   * which sends the input to the backend for further processing. If
   * registration with the backend is successful, the user is routed to the
   * login page.<br>
   *   If input is not valid, an error message is displayed to the user.
   * @param event - the event that triggered this function call
   */
  handleRegister(event) {
    event.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password
      ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
          },
          error => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            this.setState({
              successful: false,
              message: resMessage
            });
          }
      );
    }
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    return (
        <div className="col-md-12">
          <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

          {/* visualization of register form  */}
            <Form
                onSubmit={this.handleRegister}
                ref={c => {
                  this.form = c;
                }}
            >
              {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required, email]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required, vpassword]}
                      />
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
              )}

              {this.state.message && (
                  <div className="form-group">
                    <div
                        className={
                          this.state.successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                        }
                        role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
              )}
              <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
              />
            </Form>
          </div>
        </div>
    );
  }
}
export default Register;