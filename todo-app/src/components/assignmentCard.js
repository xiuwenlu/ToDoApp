import React, { Component } from 'react';
// import skygear from 'skygear';
import '../App.css';
import '../styles/foundation.css';
import '../styles/App.css';

class AssignmentCard extends Component {

    constructor (props) {
        super(props)
        this.state = { modalActive: true }
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
                        <h5>{this.props.assignName}</h5>
                    </div>
                    <div className='small-5 columns'>
                         {this.props.children} 
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
        );
    }
}
export default AssignmentCard;