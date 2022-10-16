import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App.js'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch, connect } from 'react-redux'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

function reducer(currentState, action) {
  if(localStorage.getItem('access_token') !== null){
    if (currentState === undefined) {
      return {
        loginState: true,
      };
    }
  }else{
    if (currentState === undefined) {
      return {
        loginState: false,
      };
    }
  }
  const newState = { ...currentState };
  if (action.type === 'Login') {
      newState.loginState = true;
  }
  return newState
}
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
