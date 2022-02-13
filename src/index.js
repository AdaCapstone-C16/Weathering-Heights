
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import { Router, BrowserRouter, HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/Weathering-Heights" history={history}> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);