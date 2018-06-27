import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './css/markerstyle.css';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Constants for messages
const footmsg = "Zoom in to see Subway Lines and Stops. Click on a Stop to retrieve information. Developed by Marta Padilla Ruiz for Transit Test. June 2018. "
const titlemsg = "MTA New York City Transit - Subway"

//Passing msgs to the App as props
ReactDOM.render(<App footer={footmsg} title={titlemsg}/>, document.getElementById('root'));
registerServiceWorker();
