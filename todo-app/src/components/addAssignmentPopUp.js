import React, { Component } from 'react';
import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AddAssignmentPopUp extends Component {

  constructor (props) {
    super(props)
    this.state = { 
        modalActive: false,
        assignName:'',
        courseName:'',
        Deadline:''
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.handleAssignName = this.handleAssignName.bind(this);
    this.handleCourseName = this.handleCourseName.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
    // const LIMIT = 9999;
    // const ToDos = skygear.Record.extend('ToDos');
  }

  openModal() {
    this.setState({ modalActive: true });
  }

  closeModal() {
    this.setState({ modalActive: false, assignName:'', courseName:'', Deadline:'' });
  }

  addAssignment() {
    if (!this.state.assignName || !this.state.courseName || !this.state.Deadline) {
        alert('Please enter all fields!');
    } else {
        const Assignments = skygear.Record.extend('Assignments');
        var record = new Assignments({
        "Assignment" : this.state.assignName, "Course" : this.state.courseName, 
        "Deadline": this.state.Deadline, "Overdue:": false
        });
        record.AssignSeqNum = new skygear.Sequence();
        skygear.privateDB.save(record).then((record) => {
        console.log("This is how the record looks: " + record._id);
        this.closeModal();
        //need to add this assignment to the list.
        }, (error) => {
            console.error(error);
            this.setState ({ modalActive: true, assignName:'', courseName:'', Deadline:''});
        });
    }
  }

  handleAssignName(event) {
    this.setState ({ assignName: event.target.value });
  }
  handleCourseName(event) {
     this.setState ({ courseName: event.target.value });
  }
  handleDeadline(event) {
     this.setState ({ Deadline: event.target.value });
  }

  render () {
    return (
      <div>
        <button onClick={this.openModal}>+ Add</button>

        {this.state.modalActive && (
        <div className='popup'>
            <h5> Add New Assignment </h5>
            <div className='row' id='tasks'> 
                <div className='medium-4 columns' >
                    Assignment Name
                <input type = 'text' id='task-input' placeholder='Enter assignment here...' value={this.state.assignName} onChange={this.handleAssignName} maxLength='140'></input>
                </div>
                <div className='medium-4 columns' >
                    Course Code/Name
                <input type = 'text' id='task-input' placeholder='Enter course here...' value={this.state.courseName} onChange={this.handleCourseName} maxLength='140'></input>
                </div>
                <div className='medium-4 columns'>
                    Due Date & Time
                    <input type = 'datetime-local' id='due-date' value={this.state.Deadline} onChange={this.handleDeadline}></input>
                </div>
            </div>
            <div className='row' id='popup-buttons'>
                <div className='medium-4 columns'>
                    <button id='add-assign' onClick={this.addAssignment}>Confirm</button>
                </div> 
                <div className='medium-4 columns'>
                    <button className='cancel-delete' onClick={this.closeModal}> Cancel</button>
                </div> 
            </div>
        </div>
        )}
      </div>
    );
  }
}
export default AddAssignmentPopUp;