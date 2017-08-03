import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';
import {checkOverdue, updateRecordByID} from './authentication';


class AssignmentCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: true, 
                        Overdue: this.props.Overdue,
                        selected: this.props.selected, 
                        assignmentID:this.props.assignmentID 
                    }
        this.openCard = this.openCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.setOverDue = this.setOverDue.bind(this);
    }

    openCard() {
        this.setState({ modalActive: true });
    }

    deleteCard() {
        this.setState({ modalActive: false });
    }

    setOverDue() {
        this.setState({overDue:true});
    }
    handleSelect() {
        // this.setState({selected:true});
        this.props.setSelectedAssignment(this.state.assignmentID);
        this.props.handleRemoveSelect(this.state.assignmentID);
        document.getElementById(this.state.assignmentID).className = 'selected';
        this.props.LoadTasks(this.state.assignmentID);
    }

    render() {
        let overdue = '';

        if (checkOverdue(this.props.Deadline)) {
            overdue = 'Overdue';
            if (!this.state.Overdue) {
                updateRecordByID(this.state.assignmentID, "Assignments", "Overdue", true);
            }
        }
        if (!this.state.Overdue && !checkOverdue(this.props.Deadline)) {
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
                    overdue = "Today";
                }
            }
        }
    
        return(
            this.state.modalActive && (
                <li key={this.state.assignmentID} id={this.state.assignmentID} className ='unselected' onClick={this.handleSelect}>
                    <div className='row'>
                        <div className='small-5 columns'>
                            <h5>{this.props.assignName}</h5>
                        </div>
                        <div className='small-5 columns'>
                            {React.cloneElement(this.props.children, { deleteCard: this.deleteCard })}
                        </div>
                    </div>
                    <div className='assign-info'>
                        <div className='row'>
                            <div className='large-4 columns'>
                                <h6>Course</h6> 
                            </div>
                            <div className='large-8 columns'>
                                {this.props.courseName}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='large-10 columns'>
                                <div className='large-5 columns' id='due'>
                                     <h6>Due Date</h6>  
                                </div>
                                <div className='large-8 columns' id='date-display'>
                                    {this.props.Deadline}
                                </div>
                            </div>
                            <div className='large-4 columns'>
                                <p className={overdue}>{overdue}</p>
                            </div>  
                        </div>
                    </div>
                </li>
            )
        );
    }
}

export default AssignmentCard;