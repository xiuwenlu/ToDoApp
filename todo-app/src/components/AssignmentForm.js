import React, { Component } from 'react';
import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';
import addTasks from './addTasks';

class AssignmentForm extends Component {

    render() {
        return (
            <div className='row collapse' id='assignments'>
                <div className='medium-4 columns'>
                    <h4> Assignments </h4>
                    <button>+ Add</button>
                    <ul className='vertical tabs' data-tabs id='example-tabs'> 
                    </ul>
                </div>
                <div className='medium-8 columns' id = 'subtask-container'>
                    <div className='row' id='tasks'> 
                        <addTasks />
                    </div>
                    <div className='tabs-content' data-tabs-content='example-tabs' id='task-ul'>
                        <h4> Your Current To-Do List </h4>
                        <addTasks />

                        <ul id='task-list'> 
                        </ul>
                    </div>
                </div>
		    </div>
        );
    }
}
export default AssignmentForm;
