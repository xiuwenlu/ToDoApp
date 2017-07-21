import React, {Component} from 'react';
import {connect} from 'react-redux';

class AssignmentDetail extends Component {
    render() {
        //this checks if on load a no user is selected yet
        // just asks it to select something first
        if (!this.props.assignment) {
            return (<h4> Select an assignment...</h4>);
        }
        return (
            <div>
                <h2>{this.props.assignment.first}</h2>
                <p>Description: {this.props.assignment.description}</p>
            </div>
        );
    }
}
function mapStateTopProps(state) {
    return {
        assignment: state.activeAssignment
    };
}

export default connect(mapStateTopProps)(AssignmentDetail);