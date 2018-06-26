import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './markerstyle.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const footmsg = "Zoom in to see Subway Lines and Stops. Click on a Stop to retrieve information. Developed by Marta Padilla Ruiz for Transit Test. June 2018. "
const titlemsg = "MTA New York City Transit - Subway"

ReactDOM.render(<App footer={footmsg} title={titlemsg}/>, document.getElementById('root'));
registerServiceWorker();
