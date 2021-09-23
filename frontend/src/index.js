import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loading from './comp/Loading.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

function pageInfo(state = '', action){
  switch (action.type){
    case 'pagePush':
      return action.val;
    
    default:
      return state;
  }
}
function loading(state = false, action){
  switch (action.type){
    case 'lodingOn':
      return true;
    case 'lodingOff':
      return false;
    default:
      return state;
  }

}


function datePickerModal(state=false, action){
  switch (action.type){
    case 'modalOn':
      return true;
    case 'modalOff':
      return false;
    default:
      return state;
  }
}

let store = createStore(combineReducers({datePickerModal, loading, pageInfo}));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Loading/>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
