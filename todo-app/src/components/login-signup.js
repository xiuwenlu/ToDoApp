
import React from 'react';

export function SignupButton(props) {
    return (
        <button className='switchButttons' id='signupSwitch' data-track-button-label='Top Right' onClick={props.onClick}>
        Sign Up
        </button>
    );
}

export function LoginButton(props) {
    return (
        <button className='switchButttons' id='loginSwitch' data-track-button-label='Top Right'onClick={props.onClick}>
        Login
        </button>
    );
}

export function LogoutButton(props) {
    return (
        <button className='switchButttons' id='logoutSwitch' data-track-button-label='Top Right'onClick={props.onClick}>
        Logout
        </button>
    );
}

export function SignupForm(props) {
    return (
        <div className='row'>
            <div id='sign-in'>
                <h5>Sign Up</h5>
                <div className='labels'>
                    Username <input className='logins' type='text' id='username' required></input>
                </div>
                <div className='labels'>
                    Password <input className='logins' type='password' id='password' required></input>
                </div>
                <div className='signup-switch'>
                    <div className='labels'>
                        Confirm Password <input className='logins' type='password' id='passwordConf' required></input>
                    </div>
                    <button id='sign-up' onClick={props.signUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export function LoginForm(props) {
    return (
        <div className='row'>
            <div id='sign-in'>
                <h5>Login</h5>
                <div className='labels'>
                    Username <input className='logins' type='text' id='username' required></input>
                </div>
                <div className='labels'>
                    Password <input className='logins' type='password' id='password' required></input>
                </div>
                    <button id='log-in' onClick={props.login}>Login</button>
            </div>
         </div>
    );
}
