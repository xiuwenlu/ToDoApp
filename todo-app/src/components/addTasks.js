
import React, { Component } from 'react';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class addTasks extends Component {
    render() {
        return(
            <div> 
                <div className='medium-4 columns' >
                    <input type = 'text' id='task-input' placeholder='Enter task here...' maxlength='140'></input>
                </div>
                <div className='medium-4 columns'>
                    <input type = 'datetime-local' id='due-date'></input>
                </div>
                <div className='medium-4 columns'>
                    <button onclick='newElement()' id='add-task'> Add New Task</button>
                </div>
            </div>
        );
    }
}
export default addTasks;
   