
import React, { Component } from 'react';
import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AddTasks extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            taskName:'',
            Deadline:'',
            Overdue:false
        }
        this.addTask = this.addTask.bind(this);
        this.handleTaskName = this.handleTaskName.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        const LIMIT = 9999;
    }

    addTask() {
        if (!this.state.taskName || !this.state.Deadline) {
            alert('Please enter all fields!');
        } else {
            const ToDos = skygear.Record.extend('ToDos'); 
            var record = new ToDos({
            'content' : this.state.taskName, 
            'Deadline': this.state.Deadline, 'Overdue': false,
            'AssignID':this.props.currentAssignment,
            'Completed': false,
            'DateCompleted': '',
            'Image': false
            });
            skygear.privateDB.save(record).then((record) => {
                console.log('This is how the record looks: ' + record._id);
                this.setState ({taskName:'', Deadline:''});
                this.props.addTaskToList(record);
            }, (error) => {
                console.error(error);
                this.setState ({taskName:'', Deadline:''});
            });
        }
    }

    handleTaskName(event) {
        this.setState ({ taskName: event.target.value });
    }
    handleDeadline(event) {
        this.setState ({ Deadline: event.target.value });
    }
    render() {
        return(
            <div className='row' id='tasks'> 
                <div className='large-4 columns' >
                    Task
                <input type = 'text' id='task-input' placeholder='Enter task here...' value={this.state.taskName} onChange={this.handleTaskName} maxLength='140'></input>
                </div>
                <div className='large-4 columns'>
                    Due Date & Time
                    <input type = 'datetime-local' id='due-date' value={this.state.Deadline} onChange={this.handleDeadline}></input>
                </div>
                <div className='large-4 columns'>
                    <button id='add-task' onClick={this.addTask}> + New Task</button>
                </div> 
            </div>
        );
    }
}
export default AddTasks;
   