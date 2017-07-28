import React, { Component } from 'react';
import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class DeleteAssignmentPopup extends Component {

  constructor (props) {
    super(props)
    this.state = { modalActive: false }
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
        let type = 'Assignments'
        if(this.props.type !== 'assignment') {
            type = 'ToDos'
        }
        skygear.privateDB.delete({
            id: type + '/' + this.props.id
        }).then((record) => {
            console.log(record);
            console.log('Delete '+ this.props.type +' successfully!');
            this.props.deleteCard();
            this.props.removeFromList(this.props.type, this.props.id);
        }, (error) => {
            console.error(error);
        });
        if (this.props.type === 'assignment') {
            const ToDos = skygear.Record.extend('ToDos'); 
            var query = new skygear.Query(ToDos);
            query.equalTo('AssignID', this.props.id);
            var foundNotes = [];
            skygear.privateDB.query(query)
            .then((records) => {
            if (records.length > 0) {
                console.log(`Found ${records.length} record, going to delete them.`);
                foundNotes = records;
                var recsToDelete = [];
                records.forEach(function(rec) {
                recsToDelete.push(rec);
                });
                return skygear.privateDB.delete(recsToDelete); // return a Promise object
            } else {
                console.log('There were not any to-dos for this assignment.');
            }
            })
            .then((errors) => {
            if(errors) {
                errors.forEach((perError, idx) => {
                if (perError) {
                    console.error('Fail to delete', foundNotes[idx]);
                }
                });
            } else {
                console.log('Delete successfully!');
                document.getElementById('task-list').innerHTML = '';
            }
            }, (reqError) => {
            console.error('Request error', reqError);
            });
        }
      this.setState({modalActive: false});
  }

  render () {

    return (
        <div>
            <button className='close-buttons' onClick={this.openModal}>X</button>
            {this.state.modalActive && (
                <div className='popup' id='delete-assign-pop'>
                    <div><h6>Delete this {this.props.type}?</h6></div>
                    <div className='row' id='popup-buttons'>
                        <div className='medium-6 columns'>
                            <button id='confirm-delete' onClick={this.deleteAssignment}>Confirm</button>
                        </div> 
                        <div className='medium-6 columns'>
                            <button className='cancel-delete' onClick={this.closeModal}>Cancel</button>
                        </div> 
                    </div>
                </div>
            )}
        </div>
    );
  }
}

export default DeleteAssignmentPopup;