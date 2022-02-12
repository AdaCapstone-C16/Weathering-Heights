
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/Weathering-Heights">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);