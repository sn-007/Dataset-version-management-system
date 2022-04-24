import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from  'react-alert-template-basic';

//import { usePromiseTracker } from "react-promise-tracker";


// const LoadingIndicator = props => {
//      const { promiseInProgress } = usePromiseTracker();
  
//      return (
//        promiseInProgress && 
//       <h1>Hey some async call in progress ! </h1>
//     );  
//    }

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AlertProvider>,
  document.getElementById('root')
);

