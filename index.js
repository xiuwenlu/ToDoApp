import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/Main';
import {createStore} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import Header from './components/header';
import skygear from 'skygear';


const store = createStore(allReducers);


// skygear.config({
//     'endPoint': 'https://onboarding.skygeario.com/', // trailing slash is required
//     'apiKey': '7db0c25041ab4154b82233f3e308b2ba'
// })
          
// Render the main component into the dom
ReactDOM.render(
    <Provider store = {store}>
        <AppComponent />
    </Provider>,
    document.getElementById('app'));

ReactDOM.render(<Header />,document.getElementById('header'));

