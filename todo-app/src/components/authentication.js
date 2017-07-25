// import React from 'react';
import skygear from 'skygear';

export function signup (username, password, passwordConf) {
  if (checkSignupInfo(username, password, passwordConf)) {
    skygear.signupWithUsername(username, password).then((user) => {
        console.log(user); // user object
        alert('Welcome, signed up successfully!');
        // location.href = 'onboarding-prof.html';
        return true;
      }, (error) => {
        console.error(error);
        if (error.error.code === skygear.ErrorCodes.Duplicated) {
          // the username has already existed
          alert('This user already exists.');
          return false;

        } else {
            // other kinds of error
            alert('Error!');
            return false;
          }
        });
  } else {
    return false;
  }
}

export function checkSignupInfo(username, password, passwordConfirm) {
  if (username.length < 1) {
    alert('Please enter a username.');
    return false;
  }
  if (password.length < 6) {
    alert('Password is too short. Please enter a password with atleast 6 characters.');
    return false;
  }
  if (password !== passwordConfirm) {
    alert('Password does not match. Please try again.');
    return false;
  }
  return true;
}


export function checkLoginInfo(username, password) {
  if (username.length < 1) {
    alert('Please enter a username.');
    return false;
  }
  if (password.length < 6) {
    alert('Password is too short. Please enter a password with atleast 6 characters.');
    return false;
  }
  return true;
} 

export function login (username, password) {
  if (checkLoginInfo(username,password)) {
    skygear.loginWithUsername(username, password).then((user) => {
      console.log(user); // user object
      // location.href = 'onboarding-prof.html';
      return true;
    }, (error) => {
      console.error(error);    
      if (error.error.code === skygear.ErrorCodes.InvalidCredentials ||
        error.error.code === skygear.ErrorCodes.ResourceNotFound ) {
        // incorrect username or password
        alert('Incorrect Username or Password.');
        return false;
    } else {
      alert('Error!');
      return false;
    }
  });
  } else {
    return false;
  } 
}

export function getUserName() {
  skygear.whoami().then((user) => {
    var username = `${user.username}`;
    var span = document.createElement('SPAN');
    span.appendChild(document.createTextNode(username));
    span.id = 'user';
    document.getElementById('user-prof').appendChild(span);
  }, (err) => {
      console.log('Error');
  });
}

export function logout () {
  skygear.logout().then(() => {
    console.log('logout successfully');
    // location.href = "index.html";
  }, (error) => {
    console.error(error);
  });
}