import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';
// import addAssignmentPopUp from './addAssignmentPopUp';

class AssignmentForm extends Component {

    render() {
        const getPopUp = <addAssignmentPopUp />;
        return (
            <div className='row collapse' id='assignments'>
                <div className='large-4 columns' id='assign-heading'>
                    <div className='row' id='add-assign-container'>
                        <div className='large-1 columns' >
                            <h5> Assignments </h5>
                        </div>
                        <div className='large-5 columns' >
                            <button id='add-assign'data-open='exampleModal1'>+ Add</button>
                        </div>
                    </div>
                    <div className='reveal' id='exampleModal1' data-reveal>
                        <h1>Awesome. I Have It.</h1>
                        <p className='lead'>Your couch. It is mine.</p>
                        <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
                        <button className='close-button' data-close aria-label='Close modal' type='button'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div> 
                    <ul className='vertical tabs' data-tabs id='example-tabs'> 
                    </ul>
                </div>
                <div className='large-8 columns' id = 'subtask-container'>
                    <h5> Your Current To-Do List </h5>
                    <div className='row' id='tasks'> 
                        <div className='large-4 columns' >
                            Task
                        <input type = 'text' id='task-input' placeholder='Enter task here...' maxLength='140'></input>
                        </div>
                        <div className='large-4 columns'>
                            Due Date&Time
                            <input type = 'datetime-local' id='due-date'></input>
                        </div>
                        <div className='large-4 columns'>
                            <button id='add-task'> + New Task</button>
                        </div> 
                    </div>
                    <div className='tabs-content' data-tabs-content='example-tabs' id='task-ul'>
                        <ul id='task-list'> 
                        </ul>
                    </div>
                </div>
                
		    </div>
        );
    }
}
export default AssignmentForm;
