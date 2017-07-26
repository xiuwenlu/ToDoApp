import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AssignmentCard extends Component {

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
            <div id='assignment-card'>
                <div className='row'>
                    <div className='small-5 columns'>
                        <h5>Assignment</h5>
                    </div>
                    <div className='small-5 columns'>
                         {this.props.children} 
                    </div>
                </div>
                <div className='assign-info'>
                    <p>Course</p>
                    <div className='row'>
                        <div className='small-5 columns'>
                            <p>Due Date</p>
                        </div>
                        <div className='small-5 columns'>
                            <p>Overdue</p>
                        </div>  
                    </div>           
                </div>
            </div>
        );
    }
}
export default AssignmentCard;