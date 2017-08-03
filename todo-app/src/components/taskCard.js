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
                       dateCompleted: this.props.CompletedDate,
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
            // document.getElementsBy(this.props.id).className = 'completed-tasks';
            this.setState({image:true, completed:true, dateCompleted:completeDate, Overdue: true});
            updateRecordByID(this.props.id, 'ToDos', 'Completed', true);
            updateRecordByID(this.props.id, 'ToDos', 'CompletedDate', completeDate);
            updateRecordByID(this.props.id, 'ToDos', 'Image', true);
            updateRecordByID(this.props.id, 'ToDos', 'Overdue', true);    
        }
    }

    render() {
        let alert ='';
        let image = this.state.image ? require('../images/black-check.png') : require('../images/gray-check.png')
        let className ='';
        let completedTitle ='';
        let completedClass ='';
        if (!this.state.completed && checkOverdue(this.props.Deadline)) {
            alert = "Overdue";
            className = "Overdue-task";
            if (!this.state.Overdue) {
               updateRecordByID(this.props.id, 'ToDos', 'Overdue', true);
            }
        } else if (this.state.completed) {
            completedTitle = 'Compeleted On';
            completedClass = 'completed';
            let date = this.state.dateCompleted;
            alert = date.split(" ")[1] + ' ' + date.split(" ")[2] +' ' + date.split(" ")[3];
            image = require('../images/black-check.png');
            className = 'completed-date';
        } else if (!this.state.Overdue && !checkOverdue(this.props.Deadline)) {
            let deadline = this.props.Deadline;
            var dateVal = deadline.split('T')[0];
            var timeVal = deadline.split('T')[1];
            var hrVal = timeVal.split(':')[0];
            var minVal = timeVal.split(':')[1];
            var dueTime = new Date(dateVal);
            dueTime.setHours(hrVal);
            dueTime.setMinutes(minVal);
            let today = new Date();
            let currentDate = today.toString();
            currentDate = currentDate.split(' ')[2];
            var timeDiff = dueTime - today;

            if (timeDiff <= 86400000) {               
                if (dateVal.split('-')[2] === currentDate) {
                    alert = "Today";
                    className = "Today-task";
                }
            }
        }
        
        return(
            this.state.modalActive && (
                <div key={this.props.id} id='task-card'>
                    <div className='row'>
                        <div className='small-2 columns'>
                            <button id='task-completed' onClick={this.handleCompleteTask}><img src={image} alt=''></img></button>
                        </div>
                        <div className='small-6 columns'>
                            <h5 className='task-title'> {this.props.taskName}</h5>
                            <div className='small-5 columns' id='due'>
                                <h6>Due Date</h6>  
                            </div>
                            <div className='small-8 columns'id='dateDisplay'>
                                <p>{this.props.Deadline}</p>
                            </div>
                        </div>
                        <div className='small-2 columns'>
                            <p className={completedClass}>{completedTitle}</p>
                            <p className={className} >{alert}</p>
                        </div> 
                        <div className='small-2 columns' id='delete-task'>
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