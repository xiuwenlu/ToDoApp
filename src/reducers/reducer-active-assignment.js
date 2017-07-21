//this is for which ever user that is currently selected
//its job is to listen for user selection
//no matter what actions are done, need to send this info to all reducers

export default function(state=null, action) {
    // need to give this a default value to prevent generating erros
    switch(action.type) {
        case 'ASSIGNMENT_SELECTED':
            return action.payload;
    }
        return state;
}