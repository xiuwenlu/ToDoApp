import React, { Component } from 'react';
import skygear from 'skygear';
import './App.css';
import './styles/foundation.css';
import './styles/App.css';
import {logout, checkLoginInfo, checkSignupInfo, checkOverdue, updateRecordByID, loadSublistPushNotifDeadlines,
        loadAssignments, setPushNotif } from './components/authentication';
import {SignupButton, LoginButton ,LogoutButton, SignupForm, LoginForm, UserLogo} from './components/login-signup';
import AssignmentForm from './components/AssignmentForm';
import AddTasks from './components/addTasks';
import AddAssignmentPopUp from './components/addAssignmentPopUp';
import AssignmentCard from './components/assignmentCard';
import DeleteAssignmentPopup from './components/deleteAssignmentPopUp';
import TaskCard from './components/taskCard';


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
        this.addCurrentAssignment = this.addCurrentAssignment.bind(this);
        this.AddTaskToList = this.AddTaskToList.bind(this);
        this.LoadTasks = this.LoadTasks.bind(this);
        this.DisplayTasks = this.DisplayTasks.bind(this);
        this.setSelectedAssignment = this.setSelectedAssignment.bind(this);
        this.handleRemoveSelect = this.handleRemoveSelect.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
        this.loadSublistPushNotifDeadlines = this.loadSublistPushNotifDeadlines.bind(this);
        this.needUpdateOverdue = this.needUpdateOverdue.bind(this);
        this.LoadAll = this.LoadAll.bind(this);
        // this.updateRecordByID = this.updateRecordByID.bind(this);
                // this.setPushNotif = this.setPushNotif.bind(this);

        // this.notifyMe = this.notifyMe.bind(this);
        this.state = {
            signup:localStorage.getItem('signup')|| true, 
            loggedIn:localStorage.getItem('loggedIn') || false,
            signupSubmit:localStorage.getItem('signupSubmit') || false,
            loginSubmit:localStorage.getItem('loginSubmit') || false,
            username: localStorage.getItem('username') || '',
            password: '',
            passwordConf:'',
            AssignmentList: [],
            TaskList:[],
            currentAssignment:'',
            AllTasks: []
        };
    }
    
    handleLoginClick() {
        // this.localStorage.setItem('signup', true);
        // this.localStorage.setItem('loggedIn', false);

        this.setState({signup: true , loggedIn:false});
    }

    handleSignUpClick() {
        // this.localStorage.setItem('signup', false);
        // this.localStorage.setItem('loggedIn', false);

        this.setState({signup:false , loggedIn:false});
    }

    handleLogoutClick() {
        logout();
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('signup');
        localStorage.removeItem('signupSubmit');
        localStorage.removeItem('loginSubmit');
        localStorage.removeItem('username');
        // localStorage.removeItem('password');
        // localStorage.removeItem('passwordConf');
        // localStorage.removeItem('AssignmentList');
        // localStorage.removeItem('TaskList');
        // localStorage.removeItem('currentAssignment');
        // localStorage.removeItem('AllTasks');

        this.setState({
            // signup:localStorage.getItem('signup'), 
            // loggedIn:localStorage.getItem('loggedIn'),
            // signupSubmit:localStorage.getItem('signupSubmit'),
            // loginSubmit:localStorage.getItem('loginSubmit'),
            // username:localStorage.getItem('username'),
            // password:localStorage.getItem('password'),
            // passwordConf:localStorage.getItem('passwordConf'),
            // AssignmentList:localStorage.getItem('AssignmentList'),
            // TaskList:localStorage.getItem('TaskList'),
            // currentAssignment:localStorage.getItem('currentAssignment'),
            // AllTasks: localStorage.getItem('AllTasks')
            signup:true, 
            loggedIn:false,
            signupSubmit:false,
            loginSubmit:false,
            username:'',
            password:'',
            passwordConf:'',
            AssignmentList:[],
            TaskList:[],
            currentAssignment:'',
            AllTasks:[]
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
            skygear.auth.loginWithUsername(this.state.username, this.state.password).then((user) => {
            console.log(user); // user object
            // localStorage.setItem('AssignmentList', []);
            // localStorage.setItem('TaskList', []);
            // localStorage.setItem('currentAssignment', null);
            // localStorage.setItem('AllTasks', []);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('password', this.state.password);
            localStorage.setItem('passwordConf', this.state.passwordConf);
            localStorage.setItem('signupSubmit', false);
            localStorage.setItem('loginSubmit', true);
            localStorage.setItem('signup', true);

            this.setState ({
                signup:localStorage.getItem('signup'), 
                loggedIn:localStorage.getItem('loggedIn'),
                signupSubmit:localStorage.getItem('signupSubmit'),
                loginSubmit:localStorage.getItem('loginSubmit'),
                username:localStorage.getItem('username'),
                // password:localStorage.getItem('password'),
                // passwordConf:localStorage.getItem('passwordConf'),
                // AssignmentList:localStorage.getItem('AssignmentList'),
                // TaskList:localStorage.getItem('TaskList'),
                // currentAssignment:localStorage.getItem('currentAssignment'),
                // AllTasks: localStorage.getItem('AllTasks')
            });
            this.LoadAll();
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
            skygear.auth.signupWithUsername(this.state.username, this.state.password).then((user) => {
                console.log(user); // user object
                alert('Welcome, signed up successfully!');

                // localStorage.setItem('AssignmentList', []);
                // localStorage.setItem('TaskList', []);
                // localStorage.setItem('currentAssignment', null);
                // localStorage.setItem('AllTasks', []);
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('username', this.state.username);
                // localStorage.setItem('password', this.state.password);
                // localStorage.setItem('passwordConf', this.state.passwordConf);
                localStorage.setItem('signupSubmit', true);
                localStorage.setItem('loginSubmit', false);
                localStorage.setItem('signup', true);

            this.setState ({
                signup:localStorage.getItem('signup'), 
                loggedIn:localStorage.getItem('loggedIn'),
                signupSubmit:localStorage.getItem('signupSubmit'),
                loginSubmit:localStorage.getItem('loginSubmit'),
                username:localStorage.getItem('username'),
                // password:localStorage.getItem('password'),
                // passwordConf:localStorage.getItem('passwordConf'),
                // AssignmentList:localStorage.getItem('AssignmentList'),
                // TaskList:localStorage.getItem('TaskList'),
                // currentAssignment:localStorage.getItem('currentAssignment'),
                // AllTasks: localStorage.getItem('AllTasks')
            });

                // this.setState ({
                //     loggedIn: true,
                //     signupSubmit:true,
                //     loginSubmit:false
                // });
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

    LoadAll() {
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
            if (records.length > 0) {
                // localStorage.setItem('currentAssignment', r[0]._id);
                // this.setState ({currentAssignment: localStorage.getItem('currentAssignment')});
                this.setState ({currentAssignment: r[0]._id});
            }
            localStorage.setItem('AssignmentList', r);
            // this.setState ({AssignmentList: localStorage.getItem('AssignmentList')});
            this.setState ({AssignmentList:r});

            if(this.state.currentAssignment) {
                this.LoadTasks(this.state.currentAssignment);
            }
            this.loadAssignments(r);
            this.GetAllTasks();
        }, (error) => {
            console.error(error);
        });
    }
    componentDidMount() {
        if(this.state.loggedIn) {
            window.addEventListener('load', this.LoadAll);
        }
    }
    loadSublistPushNotifDeadlines(records) {
        for (var i=0; i<records.length; i++) {
            var assignName = records[i].content;
            var deadline = records[i].Deadline;
            console.log('record: ' + records[i] + ' assignName: ' + assignName + ' deadline: ' + deadline );
            if (!records[i].Overdue) {
                setPushNotif(deadline, assignName, 'ToDos', records[i]._id, false);
            }
        }
    }
    loadAssignments(records) {
        for (var i=0; i<records.length; i++) {
            var assignName = records[i].Assignment;
            var deadline = records[i].Deadline;
            console.log('record: ' + records[i] + ' assignName: ' + assignName + 'deadline: ' + deadline );
             
            if (!records[i].Overdue) {
                setPushNotif(deadline, assignName, 'Assignments', records[i]._id, false);
            }
            if (checkOverdue(deadline)) {
                this.needUpdateOverdue(records[i]._id, "Assignment");
            } 
        }
    }

    needUpdateOverdue(id, type) {
        let array = this.state.AssignmentList;
        if (type === 'task') {
             array = this.state.TaskList;
        }
        array.forEach(function(element) {
            if (element._id === id) {
                element.Overdue = true;
            } 
        });
        if (type === 'task') {
            localStorage.setItem("TaskList", array);
            // this.setState({TaskList:localStorage.getItem("TaskList")});
            this.setState({TaskList:array});

        } else {
            localStorage.setItem("AssignmentList", array);
            // this.setState({AssignmentList:localStorage.getItem("AssignmentList")});
            this.setState({AssignmentList:array});
        }
    }
    addCurrentAssignment(id, record) {
        console.log('yesss set assigment');
        let newAssignmentList = []
        if (this.state.AssignmentList) {
            newAssignmentList = this.state.AssignmentList;
        }
        newAssignmentList.push(record);
        localStorage.setItem("currentAssignment", id);
        localStorage.setItem("AssignmentList", newAssignmentList);
        this.setState({currentAssignment:id, AssignmentList: newAssignmentList});
        // this.setState({currentAssignment:localStorage.getItem("currentAssignment"), AssignmentList: localStorage.getItem("newAssignmentList")});
        if (id) {
            this.handleRemoveSelect(id);
        }
    }

    setSelectedAssignment(id) {
        localStorage.setItem("currentAssignment", id);
        // this.setState({currentAssignment: localStorage.getItem("currentAssignment")});
        this.setState({currentAssignment:id});
    }
    removeFromList(type, id) {
        console.log('removeFromList', type, id);
        if (type === 'assignment') {
            let assignments = this.state.AssignmentList;
            console.log('removeFromList 1', assignments);
            assignments = assignments.filter((assignment) => assignment._id !== id);
            // localStorage.setItem("AssignmentList", assignments);
            // this.setState({AssignmentList:localStorage.getItem("AssignmentList")});
            this.setState({AssignmentList:assignments});
            console.log('removeFromList 2', assignments);
        } else {
            let taskList = this.state.TaskList;
            // taskList.forEach(function(task){
            //     if (task._id === id) {
            //         taskList.pop(task);
            //     }
            // });
            taskList = taskList.filter((task) => task._id !== id);
            // localStorage.setItem("TaskList", taskList);
            // this.setState({TaskList:localStorage.getItem("TaskList")});
            this.setState({TaskList:taskList});

        }
    }
    LoadTasks(Assignment_id) {
        console.log('The current assignmentID: ' + Assignment_id);
        const LIMIT = 9999;
        const ToDos = skygear.Record.extend('ToDos');
        const query = new skygear.Query(ToDos);
        query.limit = LIMIT;
        query.equalTo('AssignID', Assignment_id);
        skygear.privateDB.query(query).then((records) => {
        console.log(records.constructor);
        var r = Array.from(records);
        console.log('Loaded records: ' + r);
        // localStorage.setItem('TaskList', r);
        this.setState({TaskList:r});
        // this.setState({TaskList:localStorage.getItem('TaskList')});

    }, (error) => {
        console.error(error);
    });
    }

    GetAllTasks() {
        const LIMIT = 9999;
        const ToDos = skygear.Record.extend('ToDos');
        const query = new skygear.Query(ToDos);
        query.limit = LIMIT;
        query.equalTo('Overdue', false);
        skygear.privateDB.query(query).then((records) => {
        console.log(records.constructor);
        var r = Array.from(records);
        console.log('Loaded all records: ' + r);
        // localStorage.setItem('AllTasks', r);
        this.setState({AllTasks:r});
        this.loadSublistPushNotifDeadlines(r);
    }, (error) => {
        console.error(error);
    });
    }

    AddTaskToList(record) {
        console.log('yesss add task to list');
        let newTaskList = this.state.TaskList;
        newTaskList.push(record);
        this.setState({TaskList: newTaskList});
    }

    DisplayTasks() {
        if (this.state.currentAssignment) {
            let taskList = this.state.TaskList;
            if (taskList) {
                return (
                    taskList.map((task) =>
                    <TaskCard 
                        key={task.taskID} taskName={task.content} Deadline={task.Deadline} 
                        currentAssignment={this.state.currentAssignment}
                        Overdue={task.Overdue}
                        Completed={task.Completed}
                        Image={task.Image}
                        CompletedDate={task.CompletedDate}
                        LoadTasks={this.LoadTasks}
                        id={task._id}
                    > 
                        <DeleteAssignmentPopup key={task.taskID} type='task' id={task._id}
                            removeFromList = {this.removeFromList}/>
                    </TaskCard>
                    )
                );
            }
        }
    }
    handleRemoveSelect(id) {
        let elements = document.getElementsByClassName('selected');
        for (let i = 0; i < elements.length; i++) {
            elements[i].className ='unselected';
        }
        document.getElementById(id).className = 'selected';

        let assignList = this.state.AssignmentList;
        assignList.forEach(function(assignment) {
            if (assignment._id !== id) {
                assignment.Selected = false;
            } else {
                console.log(assignment.Selected + "was this");

                assignment.Selected = true;
                console.log(id + "selected");
                console.log(assignment.Selected + "noew this");
            }
        });
        this.setState({AssignmentList: assignList});
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
            userlogo = <UserLogo />;
            //Icon made by Freepik from www.flaticon.com
            user = username;
            let listAssignments = null;
            let assignmentList = this.state.AssignmentList;

            console.log('render', assignmentList);

            if(assignmentList) {
                listAssignments = assignmentList.map((assignment) =>
                    <AssignmentCard 
                        key={assignment._id} assignName={assignment.Assignment} 
                        courseName={assignment.Course} Deadline={assignment.Deadline}
                        assignmentID={assignment._id}
                        selected={assignment.Selected}
                        Overdue={assignment.Overdue}
                        setSelectedAssignment={this.setSelectedAssignment}
                        currentAssignment={this.state.currentAssignment}
                        LoadTasks={this.LoadTasks}
                        handleRemoveSelect={this.handleRemoveSelect}
                    > 
                        <DeleteAssignmentPopup key={assignment.AssignSeqNum} type='assignment' 
                            id={assignment._id} removeFromList = {this.removeFromList}/>
                    </AssignmentCard>
                );
            } 

            let listTasks = this.DisplayTasks();

            if (!listTasks) {
                listTasks = <div> No tasks yet </div>;
            }
            if (!listAssignments) {
                listAssignments = <div> You don't have any assignments right now </div>;
            }

            form = <AssignmentForm setAssignment={this.addCurrentAssignment} 
                        addTaskToList={this.AddTaskToList}> 
                        <AddTasks key='1' currentAssignment={this.state.currentAssignment}/> 
                        <AddAssignmentPopUp key='2'/>
                        {listAssignments}
                        {listTasks}
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
                <div className='form'>
                    {form}
                </div>
            </div>
        );
    }
}

export default App;
