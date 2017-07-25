
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
                    Username <input className='logins' type='text' id='username' value={props.username} onChange={props.handleUsername} required></input>
                </div>
                <div className='labels'>
                    Password <input className='logins' type='password' id='password' value={props.password} onChange={props.handlePassword} required></input>
                </div>
                <div className='signup-switch'>
                    <div className='labels'>
                        Confirm Password <input className='logins' type='password' id='passwordConf' value={props.passwordConf} onChange={props.handlePasswordConf} required></input>
                    </div>
                    <button id='sign-up' onClick={props.signup}>Sign Up</button>
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
                    Username <input className='logins' type='text' id='username' value={props.username} onChange={props.handleUsername} required></input>
                </div>
                <div className='labels'>
                    Password <input className='logins' type='password' id='password' value={props.password} onChange={props.handlePassword} required></input>
                </div>
                    <button id='log-in' onClick={props.login}>Login</button>
            </div>
         </div>
    );
}

export function UserLogo(props) {
    return (<img src={require('../images/abstract-user.png')} alt=''></img>);
}
