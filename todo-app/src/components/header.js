import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SignupButton, LoginButton ,LogoutButton, SignupForm, LoginForm} from './login-signup';
import {login, signup ,logout} from './authentication';


class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {signup: true, loggedIn: false};
    }
    
    handleLoginClick() {
        this.setState({signup: true , loggedIn:false});
    }

    handleSignUpClick() {
        this.setState({signup: false, loggedIn:false});
    }

    handleLogoutClick() {
        this.setState({signup:false, loggedIn:false});
    }

    render() {
        const isSignup = this.state.signup;
        const loggedIn = this.state.loggedIn;
        let button = null;
        let form = null;

        if(loggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else if (isSignup && !loggedIn) {
            button = <SignupButton onClick={this.handleSignUpClick} />;
            form = <LoginForm />;
        } else if (!isSignup && !loggedIn) {
            button = <LoginButton onClick={this.handleLoginClick} />;
            form = <SignupForm />;
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


export default Header;