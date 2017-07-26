import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class DeleteAssignmentPopup extends Component {

  constructor (props) {
    super(props)
    this.state = { modalActive: false, assignment:true }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this); 
  }

  openModal () {
    this.setState({ modalActive: true });
  }

  closeModal () {
    this.setState({ modalActive: false });
  }

  deleteAssignment () {
      this.setState({modalActive: false});
  }

  render () {
    const isAssignment = this.state.assignment; 
    let heading = 'Assignment';
    if (!isAssignment) {
        heading = 'task';
    }
    return (
        <div>
            <button className='close-buttons' onClick={this.openModal}>X</button>
            {this.state.modalActive && (
                <div className='popup' id='delete-assign-pop'>
                    <div><h6>Delete this {heading}?</h6></div>
                    <div className='row' id='popup-buttons'>
                        <div className='medium-6 columns'>
                            <button id='confirm-delete' onClick={this.deleteAssignment}>Confirm</button>
                        </div> 
                        <div className='medium-6 columns'>
                            <button className='cancel-delete' onClick={this.closeModal}> Cancel</button>
                        </div> 
                    </div>
                </div>
            )}
        </div>
    );
  }
}

export default DeleteAssignmentPopup;