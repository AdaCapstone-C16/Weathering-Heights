
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/Weathering-Heights">
      <Link to="/login" />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);