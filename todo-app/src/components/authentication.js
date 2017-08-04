// import React from 'react';
import skygear from 'skygear';

export function signup (username, password, passwordConf) {
  if (checkSignupInfo(username, password, passwordConf)) {
    skygear.auth.signupWithUsername(username, password).then((user) => {
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
    skygear.auth.loginWithUsername(username, password).then((user) => {
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
  skygear.auth.whoami().then((user) => {
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
  skygear.auth.logout().then(() => {
    console.log('logout successfully');
    // location.href = "index.html";
  }, (error) => {
    console.error(error);
  });
}

export function checkOverdue(deadline) {
  let dateVal = deadline.split('T')[0];
  let timeVal = deadline.split('T')[1];
  let hrVal = timeVal.split(':')[0];
  let minVal = timeVal.split(':')[1];
  let dueTime = new Date(dateVal);
  dueTime.setHours(hrVal);
  dueTime.setMinutes(minVal);

  const currentTime = new Date();
  // console.log('the current time:' + currentTime);
  // console.log('due time: ' +  dueTime);
  const timeDiff = dueTime - currentTime;
  if (timeDiff <= 0) {
      return true;
  } else {
    return false;
  }
}

export function updateRecordByID(id, type, coln, updateDetails) {
      const ToDos = skygear.Record.extend('ToDos');
      var query = new skygear.Query(ToDos);
      if (type === 'Assignments') {
          const Assignments = skygear.Record.extend('Assignments');
          query = new skygear.Query(Assignments);
      } 
      query.equalTo('_id', id);
      skygear.privateDB.query(query).then((records) => {
          var rec = records[0];
          console.log('update details: ' + updateDetails);
          rec[coln] = updateDetails;
          return skygear.privateDB.save(rec);
          }).then((records) => {
          console.log('update success');
          }, (error) => {
          console.error(error);
          });
  }

  export function BatchUpdatesByID(id, type, dict) {
      const ToDos = skygear.Record.extend('ToDos');
      var query = new skygear.Query(ToDos);
      if (type === 'Assignments') {
          const Assignments = skygear.Record.extend('Assignments');
          query = new skygear.Query(Assignments);
      } 
      query.equalTo('_id', id);
      skygear.privateDB.query(query).then((records) => {
          var rec = records[0];
          
          for (var key in dict) {
            rec[key] = dict[key];
            console.log('update details: ' + key + ": " + dict.key);
          }
          return skygear.privateDB.save(rec);
          }).then((records) => {
          console.log('update success');
          }, (error) => {
          console.error(error);
          });
  }

  export function setPushNotif(deadline, assignName, type, id, isnew) {
        var dateVal = deadline.split('T')[0];
        var timeVal = deadline.split('T')[1];
        var hrVal = timeVal.split(':')[0];
        var minVal = timeVal.split(':')[1];
        var dueTime = new Date(dateVal);
        dueTime.setHours(hrVal);
        dueTime.setMinutes(minVal);

        var currentTime = new Date();
        // console.log('the current time:' + currentTime);
        // console.log('due time: ' +  dueTime);
        var timeDiff = dueTime - currentTime;
        // console.log('time diff: ' +  timeDiff);
        if (timeDiff > 0) {
            console.log("called setTimeout!!!!!!");
            setTimeout(notifyMe(assignName, type), timeDiff);
        } else if (timeDiff < 0 && !isnew) {
            updateRecordByID(id, type, 'Overdue', true);
        }
    }
  
    export function notifyMe(task, type) {
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.'); 
            return;
        }
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
        let label = 'assignment';
        if(type === 'ToDos') {
          label = 'task';
        }
        var notification = new Notification('You have a(n) ' + label + ' due', {
            icon: './images/icon-todo-100.png',
            body: 'Your ' + label +': ' + task + ' is due!',
        });
        notification.onclick = function () {
            window.open('https://xiuwenlu.github.io/ToDoApp/');      
        };
    }