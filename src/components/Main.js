require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import AssignmentList from './assignment-list';
import AssignmentDetail from './assignment-detail';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h2> Assignment List: </h2>
        <AssignmentList />
        <hr/>
        <h2> Assignment Details: </h2>
        <AssignmentDetail />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
