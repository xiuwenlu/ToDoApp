import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';


class AssignmentForm extends Component {
    
    render() {
        // const getPopUp = <addAssignmentPopUp />;
        return (
            <div className='row collapse' id='assignments'>
                <div className='large-4 columns' id='assign-heading'>
                    <div className='row' id='add-assign-container'>
                        <div className='large-1 columns' >
                            <h5> Assignments </h5>
                        </div>
                        <div className='large-5 columns' >
                            {/* <button id='add-assign'data-open='exampleModal1'>+ Add</button> */}
                            {/* {this.props.children[1]} */}
                            {React.cloneElement(this.props.children[1], {setAssignment: this.props.setAssignment})}
                        </div>
                    </div>
                    <ul className='vertical tabs' data-tabs id='example-tabs'>
                        <div className='tabsBackground'>
                            {this.props.children[2]} 
                        </div>
                    </ul>
                </div>
                <div className='large-8 columns' id = 'subtask-container'>
                    <h5> Your Current To-Do List </h5>
                    <div>{React.cloneElement(this.props.children[0], {addTaskToList:this.props.addTaskToList})}</div>
                    <div className='tabs-content' data-tabs-content='example-tabs' id='task-ul'>
                        <ul id='task-list'> 
                            {this.props.children[3]}
                        </ul>
                    </div>
                </div>
		    </div>
        );
    }
}
export default AssignmentForm;
