
import React, { Component } from 'react';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AddTasks extends Component {
    render() {
        return(
            <div className='row' id='tasks'> 
                <div className='large-4 columns' >
                    Task
                <input type = 'text' id='task-input' placeholder='Enter task here...' maxLength='140'></input>
                </div>
                <div className='large-4 columns'>
                    Due Date & Time
                    <input type = 'datetime-local' id='due-date'></input>
                </div>
                <div className='large-4 columns'>
                    <button id='add-task'> + New Task</button>
                </div> 
            </div>
        );
    }
}
export default AddTasks;
   