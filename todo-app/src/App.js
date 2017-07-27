import React, { Component } from 'react';
import skygear from 'skygear';
import './App.css';
import './styles/foundation.css';
import './styles/App.css';
import {logout, checkLoginInfo, checkSignupInfo} from './components/authentication';
import {SignupButton, LoginButton ,LogoutButton, SignupForm, LoginForm, UserLogo} from './components/login-signup';
import AssignmentForm from './components/AssignmentForm';
import AddTasks from './components/addTasks';
import AddAssignmentPopUp from './components/addAssignmentPopUp';
import AssignmentCard from './components/assignmentCard';
import DeleteAssignmentPopup from './components/deleteAssignmentPopUp';
import TaskCard from './components/taskCard';
// import AssignmentReducer from './reducers/assignment-reducer';


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
            passwordConf: '',
            AssignmentList: []
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
            passwordConf: '',
            AssignmentList: []
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
        
        if (checkLoginInfo(this.state.username,this.state.password)) {
            skygear.loginWithUsername(this.state.username, this.state.password).then((user) => {
            console.log(user); // user object
            // location.href = 'onboarding-prof.html';
            this.setState ({
                loggedIn: true,
                signupSubmit:false,
                loginSubmit:true
            });
            const LIMIT = 9999;
            const Assignments = skygear.Record.extend('Assignments');
            const query = new skygear.Query(Assignments);
            query.overallCount = true;
            query.limit = LIMIT;
            skygear.privateDB.query(query).then((records) => {
                console.log(records);
                console.log(records.constructor);
                var r = Array.from(records);
                console.log(Array.isArray(records));
                console.log(Array.isArray(r));
                console.log(r);
                this.setState ({AssignmentList: r});
                // <AssignmentReducer assignmentList={this.state.AssignmentList} />;
            }, (error) => {
                console.error(error);
            });
            }, (error) => {
                console.error(error);    
                if (error.error.code === skygear.ErrorCodes.InvalidCredentials ||
                    error.error.code === skygear.ErrorCodes.ResourceNotFound ) {
                    // incorrect username or password
                    alert('Incorrect Username or Password.');
                } else {
                    alert('Error!');
                }
            });
        }
    }
    handleSignupSub() {
        if (checkSignupInfo(this.state.username, this.state.password, this.state.passwordConf)) {
            skygear.signupWithUsername(this.state.username, this.state.password).then((user) => {
                console.log(user); // user object
                alert('Welcome, signed up successfully!');
                // location.href = 'onboarding-prof.html';
                this.setState ({
                    loggedIn: true,
                    signupSubmit:true,
                    loginSubmit:false
                });
            }, (error) => {
                console.error(error);
                if (error.error.code === skygear.ErrorCodes.Duplicated) {
                // the username has already existed
                    alert('This user already exists.');
                } else {
                    // other kinds of error
                    alert('Error!');
                }
            });
        }
    }

    render() {
        const isSignup = this.state.signup;
        const loggedIn = this.state.loggedIn;
        const username = this.state.username;
        const password = this.state.password;
        const passwordConf = this.state.passwordConf;
        const assignmentList = this.state.AssignmentList;
        let button = null;
        let form = null;
        let user = null;
        let userlogo = null;
        const listItems = assignmentList.map((assignment) =>
            <AssignmentCard key={assignment.AssignSeqNum} assignName={assignment.Assignment} courseName={assignment.Course} Deadline={assignment.Deadline}> 
                <DeleteAssignmentPopup key={assignment.AssignSeqNum} type='assignment' id={assignment._id}/>
            </AssignmentCard>
        );
        let assign = <AssignmentForm> 
                        <AddTasks key='1' /> 
                        <AddAssignmentPopUp key='2'/>
                        {/* {listItems} */}
                        {/* <AssignmentCard key='3' assignments={assignmentList}> 
                            <DeleteAssignmentPopup key='4' type='assignment'/>
                        </AssignmentCard> */}
                        <TaskCard key='5'>
                            <DeleteAssignmentPopup key='6' type='task'/>
                        </TaskCard>
                    </AssignmentForm>;

        if(loggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            userlogo = <UserLogo />;
            //Icon made by Freepik from www.flaticon.com
            user = username;
            // form = <AssignmentForm />;
            // form = <AssignmentForm> <addTasks /> </AssignmentForm>;
            form = <AssignmentForm> 
                        <AddTasks key='1' /> 
                        <AddAssignmentPopUp key='2'/>
                        {/* <AssignmentCard key='3' assignments={assignmentList}> 
                            <DeleteAssignmentPopup key='4' type='assignment'/>
                        </AssignmentCard> */}
                        {listItems}
                        <TaskCard key='5'>
                            <DeleteAssignmentPopup key='6' type='task'/>
                        </TaskCard>
                    </AssignmentForm>;

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
                <div className='top-bar' id='responsive-menu'>
                    <div className='top-bar-left'>
                        <ul className='dropdown menu' data-dropdown-menu>
                        <li id='heading'>Skygear ToDo List</li>
                        </ul>
                    </div>
                    <div className='top-bar-right'>
                        <ul className='menu'>
                            <li id='user-logo'>{userlogo}</li>
                            <li id='user'>{user}</li>
                            <li id='logout-switch'>{button}</li>
                        </ul>
                    </div>
                </div>
                {form}
                {/* {assign} */}
            </div>
        );
    }
}

export default App;
