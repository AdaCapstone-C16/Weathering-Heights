
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/Weathering-Heights">
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);