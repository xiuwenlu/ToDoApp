import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class TaskCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: false }
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
            <div id='task-card'>
                <div className='row'>
                    <div className='large-2 columns'>
                        <button id='task-completed'><img src={require('../images/gray-check.png')} alt=''></img></button>
                    </div>
                    <div className='large-6 columns'>
                        <div>Title</div>
                        <div>Due Date</div>
                    </div>
                    <div className='large-2 columns'>
                        Overdue
                    </div> 
                    <div className='large-2 columns' id='delete-task'>
                        {this.props.children}
                    </div> 
                </div>
            </div>
        );
    }
}

export default TaskCard;