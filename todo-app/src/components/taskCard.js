import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';
import {checkOverdue, updateRecordByID} from './authentication';

class TaskCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: true,
                       image: this.props.Image,
                       dateCompleted: this.props.DateCompleted,
                       completed: this.props.Completed,
                       Overdue: this.props.Overdue,
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
        if (!this.state.completed && !checkOverdue(this.props.Deadline)) {
            let completeDate = new Date()
            completeDate = completeDate.toString();
            this.setState({image:true, completed:true, dateCompleted:completeDate});
            updateRecordByID(this.props.id, 'ToDos', 'Completed', true);
            updateRecordByID(this.props.id, 'ToDos', 'DateCompleted', completeDate);
            updateRecordByID(this.props.id, 'ToDos', 'Image', true);
            updateRecordByID(this.props.id, 'ToDos', 'Overdue', true);    
        }
    }

    render() {
        let alert = '';
        let image = this.state.image ? require('../images/black-check.png') : require('../images/gray-check.png')
        let className = '';
        let completedTitle = '';
        let completedClass ='';
        if (!this.state.completed && checkOverdue(this.props.Deadline)) {
            alert = "Overdue";
            className = alert;
            if (!this.state.Overdue) {
               updateRecordByID(this.props.id, 'ToDos', 'Overdue', true);
            }
        } else if (this.state.completed) {
            completedTitle = 'Compeleted On';
            completedClass = 'completed';
            let date = this.state.dateCompleted;
            console.log("today's date" + date);
            alert = date.split(" ")[1] + ' ' + date.split(" ")[2] +' ' + date.split(" ")[3];
            image = require('../images/black-check.png');
            className = 'completed-date';
        }
        
        return(
            this.state.modalActive && (
                <div key={this.props.id} id='task-card'>
                    <div className='row'>
                        <div className='large-2 columns'>
                            <button id='task-completed' onClick={this.handleCompleteTask}><img src={image} alt=''></img></button>
                        </div>
                        <div className='large-6 columns'>
                            <h5 className='task-title'> {this.props.taskName}</h5>
                            <div className='large-5 columns' id='due'>
                                <h6>Due Date</h6>  
                            </div>
                            <div className='large-8 columns'id='dateDisplay'>
                                <p>{this.props.Deadline}</p>
                            </div>
                        </div>
                        <div className='large-2 columns'>
                            <p className={completedClass}>{completedTitle}</p>
                            <p className={className} >{alert}</p>
                        </div> 
                        <div className='large-2 columns' id='delete-task'>
                            {React.cloneElement(this.props.children, 
                                { deleteCard: this.deleteCard, currentAssignment: this.props.currentAssignment })}
                        </div> 
                    </div>
                </div>
                )
        );
    }
}

export default TaskCard;