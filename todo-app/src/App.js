import React, { Component } from 'react';
import './App.css';
import './styles/foundation.css';
import './styles/App.css';
import {signup, login, logout} from './components/authentication';
import {SignupButton, LoginButton ,LogoutButton, SignupForm, LoginForm, userIcon} from './components/login-signup';


class App extends Component {
  constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConf = this.handlePasswordConf.bind(this);
        this.handleLoginSub= this.handleLoginSub.bind(this);
        this.handleSignupSub = this.handleSignupSub.bind(this);

        this.state = {
            signup: true, 
            loggedIn: false,
            signupSubmit:false,
            loginSubmit:false,
            username: '',
            password: '',
            passwordConf: ''
        };
    }
    
    handleLoginClick() {
        this.setState({signup: true , loggedIn:false});
    }

    handleSignUpClick() {
        this.setState({signup: false, loggedIn:false});
    }

    handleLogoutClick() {
        logout();
        this.setState({
            signup:true, 
            loggedIn:false,
            signupSubmit:false,
            loginSubmit:false,
            username: '',
            password: '',
            passwordConf: ''
        });
    }

    handleUsername(event) {
         this.setState ({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState ({ password: event.target.value });
    }

    handlePasswordConf(event) {
         this.setState ({ passwordConf: event.target.value });
    }
    handleLoginSub() {
        this.setState ({
            loggedIn: true,
            signupSubmit:false,
            loginSubmit:true
        });
        login(this.state.username, this.state.password);
    }
    handleSignupSub() {
        this.setState ({
            loggedIn: true,
            signupSubmit:true,
            loginSubmit:false
        });
        signup(this.state.username, this.state.password, this.state.passwordConf);
    }

    render() {
        const isSignup = this.state.signup;
        const loggedIn = this.state.loggedIn;
        const username = this.state.username;
        const password = this.state.password;
        const passwordConf = this.state.passwordConf;
        let button = null;
        let form = null;
        let user = null;
        let userlogo = null;

        if(loggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            userlogo = <userIcon />;
            //Icon made by Freepik from www.flaticon.com
            user = username;
        } else if (isSignup && !loggedIn) {
            button = <SignupButton onClick={this.handleSignUpClick} />;
            form = <LoginForm login={this.handleLoginSub}
                    username={username}
                    password={password}
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}/>;
        } else if (!isSignup && !loggedIn) {
            button = <LoginButton onClick={this.handleLoginClick} />;
            form = <SignupForm signup={this.handleSignupSub}
                    username={username}
                    password={password}
                    passwordConf={passwordConf}
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}
                    handlePasswordConf={this.handlePasswordConf}/>;
        }
        //this checks if on load a no user is selected yet
        // just asks it to select something first
        // if (!this.props.assignment) {
        //     return (<h4> Select an assignment...</h4>);
        // }
        return (
            <div>
                <div data-sticky-container>
                    <header className='header' data-sticky data-options='marginTop:0;'  data-sticky-on='small' data-anchor='content'>
                        <div className='row' id='header'>
                            <div className='large-3 medium-5 small-6 columns'>
                                Skygear To-Do List
                            </div>
                            <div className='large-8 medium-6 hide-for-small-only columns text-right'>
                                <ul >
                                    <li>{userlogo}</li>
                                    <li>{user}</li>
                                    {/* <li>{button}</li> */}
                                </ul>
                            </div>
                             <div className='large-2 medium-3 small-6 columns text-right'>
                                {button}
                            </div> 
                        </div>
                    </header>
                </div>
                {form}
            </div>
        );
    }
}

export default App;
