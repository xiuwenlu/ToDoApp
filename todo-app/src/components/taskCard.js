import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class TaskCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: true }
        this.openModal = this.openModal.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    openModal () {
        this.setState({ modalActive: true });
    }

    deleteCard() {
        this.setState({ modalActive: false });
    }

    render() {
        return(
            <div>
                {this.state.modalActive && (
                <div id='task-card'>
                    <div className='row'>
                        <div className='large-2 columns'>
                            <button id='task-completed'><img src={require('../images/gray-check.png')} alt=''></img></button>
                        </div>
                        <div className='large-6 columns'>
                            <div>{this.props.taskName}</div>
                            <div>{this.props.Deadline}</div>
                        </div>
                        <div className='large-2 columns'>
                            Overdue
                        </div> 
                        <div className='large-2 columns' id='delete-task'>
                            {/* {this.props.children} */}
                            {React.cloneElement(this.props.children, { deleteCard: this.deleteCard })}
                        </div> 
                    </div>
                </div>
                )}
            </div>
        );
    }
}

export default TaskCard;