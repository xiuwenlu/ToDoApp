import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectAssignment} from '../actions/index'

class AssignmentList extends Component {

    createListItems() {
        if (this.props.assignments) {
            return this.props.assignments.map(
                (assignment) => {
                    return (
                        <li key = {assignment.id}
                            onClick = {() => this.props.selectAssignment(assignment)}
                        >
                            {assignment.first}
                        </li>
                    );
            });
        }
    }
    
    render () {
        return (
            <ul>
                {this.createListItems()}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        assignments: state.assignments
    };
}

//dispatch just means call a function
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectAssignment: selectAssignment}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);