import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GithubProvider } from './context';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(

  <React.StrictMode>
    <GithubProvider>
      <Toaster position="top-center" />
        <App />
    </GithubProvider>
  </React.StrictMode>,
 document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
