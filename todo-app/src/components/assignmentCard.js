import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AssignmentCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: true, selected: false, assignmentID:this.props.assignmentID }
        this.openCard = this.openCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    openCard() {
        this.setState({ modalActive: true });
    }

    deleteCard() {
        this.setState({ modalActive: false });
    }

    handleSelect() {
        this.setState({selected:true});
        this.props.setSelectedAssignment(this.state.assignmentID);
        this.props.handleRemoveSelect(this.state.assignmentID);
        // document.getElementById(this.state.assignmentID).className = 'selected';
        this.props.LoadTasks(this.state.assignmentID);
    }

    render() {
        return(
            <div id={this.state.assignmentID} onClick={this.handleSelect}>
                {this.state.modalActive && (
                    <div id='assignment-card'>
                        <div className='row'>
                            <div className='small-5 columns'>
                                <h5>{this.props.assignName}</h5>
                            </div>
                            <div className='small-5 columns'>
                                {React.cloneElement(this.props.children, { deleteCard: this.deleteCard })}
                            </div>
                        </div>
                        <div className='assign-info'>
                            <p>Course {this.props.courseName}</p>
                            <div className='row'>
                                <div className='small-5 columns'>
                                    <p>Due Date {this.props.Deadline}</p>
                                </div>
                                <div className='small-5 columns'>
                                    <p>Overdue</p>
                                </div>  
                            </div>           
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default AssignmentCard;