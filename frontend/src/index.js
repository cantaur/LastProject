import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loading from './comp/Loading.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import axios from 'axios';
import {host} from './comp/Helper.js'



// let loginSample = {email:'test@gmail.com', seq: '1'}

function loginUser(state={email:'', seq:''}, action){
  switch (action.type){
    case 'login':
      return {email:action.email, seq:action.seq}
    case 'logout':
      return {email:'', seq:''}
    default:
      return state
  }
}

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
    case 'loadingOn':
      return true;
    case 'loadingOff':
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

let store = createStore(combineReducers({datePickerModal, loading, pageInfo,loginUser}));


axios.get(host+'/ajax/loginUser')
.then(r=>{
  console.log(r.data)
  if(r.data == 'false'){
    console.log('---로그인한 유저없음---')
    store.dispatch({type:'logout'})
  }else {
    if(r.data.email){
      store.dispatch({type:'login', email:r.data.email, seq:r.data.seq})
      console.log('---로그인한 유저---')
      console.log(store.getState().loginUser)
    }else {
      console.log('---로그인한 유저없음---')
      store.dispatch({type:'logout'})
    }
  }
})
.catch(e=>{
  console.log('---로그인 오류발생---')
  store.dispatch({type:'logout'})
})



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
