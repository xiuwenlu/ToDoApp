import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';
import {checkOverdue} from './authentication';

class TaskCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: true,
                       image: require('../images/gray-check.png'),
                       alert: '',
                       completed: false
                       //need to save these states in the database and initialize them base on them.
                    }
        this.openModal = this.openModal.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.handleCompleteTask = this.handleCompleteTask.bind(this);
    }

    openModal () {
        this.setState({ modalActive: true });
    }

    deleteCard() {
        this.setState({ modalActive: false });
    }
    handleCompleteTask() {
        let completeDate = new Date();
        completeDate = "Completed On" + completeDate;
        this.setState({image:require('../images/black-check.png'), alert: completeDate, completed:true});
    }

    render() {
        let alert = this.state.alert;
        let image = this.state.image;
        if (!this.state.completed && checkOverdue) {
            alert = "Overdue";

        }
        if (!alert && this.state.completed) {
            image = require('../images/black-check.png');
        }

        return(
            <div>
                {this.state.modalActive && (
                <div id='task-card'>
                    <div className='row'>
                        <div className='large-2 columns'>
                            <button id='task-completed' onClick={this.handleCompleteTask}><img src={image} alt=''></img></button>
                        </div>
                        <div className='large-6 columns'>
                            <div>{this.props.taskName}</div>
                            <div>{this.props.Deadline}</div>
                        </div>
                        <div className='large-2 columns'>
                            {alert}
                        </div> 
                        <div className='large-2 columns' id='delete-task'>
                            {/* {this.props.children} */}
                            {React.cloneElement(this.props.children, 
                                { deleteCard: this.deleteCard, currentAssignment: this.props.currentAssignment })}
                        </div> 
                    </div>
                </div>
                )}
            </div>
        );
    }
}

export default TaskCard;