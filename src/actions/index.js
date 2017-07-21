//this is an action creator function
export const selectAssignment = (assignment) => {
    console.log('You clicked on assignment:', assignment.first);
    return {
        type: 'ASSIGNMENT_SELECTED',
        payload: assignment
    };
};

export const signupSelected = (username, password, passwordConf) => {
    return {
        type: 'SIGNUP_SELECTED',
        payload: username, password, passwordConf
    };
};
export const loginSelected = (username, password) => {
    return {
        type: 'LOGIN_SELECTED',
        payload: username, password
    };
};