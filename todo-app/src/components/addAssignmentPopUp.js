import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AddAssignmentPopUp extends Component {

  constructor (props) {
    super(props)
    this.state = { modalActive: false }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addAssignment = this.addAssignment.bind(this); 
  }

  openModal () {
    this.setState({ modalActive: true });
  }

  closeModal () {
    this.setState({ modalActive: false });
  }

  addAssignment () {
      this.setState({modalActive: false});
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
                <input type = 'text' id='task-input' placeholder='Enter assignment here...' maxLength='140'></input>
                </div>
                <div className='medium-4 columns' >
                    Course Code/Name
                <input type = 'text' id='task-input' placeholder='Enter course here...' maxLength='140'></input>
                </div>
                <div className='medium-4 columns'>
                    Due Date & Time
                    <input type = 'datetime-local' id='due-date'></input>
                </div>
            </div>
            <div className='row' id='popup-buttons'>
                <div className='medium-4 columns'>
                    <button id='add-assign' onClick={this.addAssignment}>Confirm</button>
                </div> 
                <div className='medium-4 columns'>
                    <button className='cancel-delete' id='cancel-add' onClick={this.closeModal}> Cancel</button>
                </div> 
            </div>
        </div>
        )}
      </div>
    );
  }
}
export default AddAssignmentPopUp;