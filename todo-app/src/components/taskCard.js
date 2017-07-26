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
        this.closeModal = this.closeModal.bind(this);
    }

    openModal () {
        this.setState({ modalActive: true });
    }

    closeModal () {
        this.setState({ modalActive: false });
    }

    render() {
        return(
            <div id='task-card'>
                <div className='row'>
                    <div className='large-2 columns' >
                        Check
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