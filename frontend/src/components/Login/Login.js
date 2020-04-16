import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './Login.css';
 
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:'',
            password:'',
        }
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleSubmit = (e) => {
        this.props.history.push({pathname:'/app'});
    };

    userChange(e){
        this.setState({ user : e.target.value })
    }

    passwordChange(e){
        this.setState({ password : e.target.value })
    }

    submit(){
        window.alert(this.state.user)
        window.alert(this.state.password)
    }
    render() {
        sessionStorage.setItem('username', this.state.user);
        sessionStorage.setItem('password',this.state.password);
        return (
            <div class = "login__div">
            <form method="post" action="login.js" class = "login__form">
                    <p className= 'login_title'>please input your username and password</p>
                    <p><label class="label_input">Username：</label><input type="text" id="username" class="text_field" onChange={this.userChange}/></p>
                    <p><label class="label_input">password：</label><input type="text" id="password" type = "password" class="text_field" onChange={this.passwordChange}/></p>
                
                    <div id="login_control">
                         <input type="button" id="btn_login" value="Login" onClick={this.submit}/>
                        {/*<a id="forget_pwd" href="forget_pwd.html">忘记密码？</a>*/}
                    </div>
            </form>
            </div>
        );
    }
}
 
 
export default Login;