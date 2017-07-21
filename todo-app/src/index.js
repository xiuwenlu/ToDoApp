import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import skygear from 'skygear';

skygear.config({
  'endPoint': 'https://onboarding.skygeario.com/', // trailing slash is required
  'apiKey': '7db0c25041ab4154b82233f3e308b2ba'
}).then(() => {
  console.log('skygear container is now ready for making API calls.');
}, (error) => {
  console.error(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
