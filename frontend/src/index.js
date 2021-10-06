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
function mileStoneList(state=false, action){
  switch (action.type){
    case 'mileStoneListCng':
      return action.val;
    default:
      return state;
  }
}
function projectList(state=false, action){
  switch (action.type){
    case 'projectListCng':
      return action.val;
    default:
      return state;
  }
}
function projectInfo(state=false, action){
  switch (action.type){
    case 'projectInfoCng':
      return action.val;
    default:
      return state;
  }
}

function memberList(state=false, action){
  switch (action.type){
    case 'memberListCng':
      return action.val;
    default:
      return state;
  }
}
function myMemberInfo(state=false, action){
  switch (action.type){
    case 'myMemberInfoCng':
      return action.val;
    default:
      return state;
  }
}

function isMaster(state=false, action){
  switch (action.type){
    case 'isMasterCng':
      return action.val;
    default:
      return state;
  }
}

function isProfileEmpty(state=false, action){
  switch (action.type){
    case 'isProfileEmptyCng':
      return action.val;
    default:
      return state;
  }
}

function taskModal(state=false, action){
  switch (action.type){
    case 'taskModalCng':
      return action.val;
    default:
      return state;
  }
}
function taskModalData(state=false, action){
  switch (action.type){
    case 'taskModalDataCng':
      return action.val;
    default:
      return state;
  }
}


let store = createStore(combineReducers(
  {
    datePickerModal,
    loading,
    pageInfo,
    loginUser,
    mileStoneList,
    projectList,
    projectInfo,
    memberList,
    myMemberInfo,
    isMaster,
    isProfileEmpty,
    taskModal,
    taskModalData,
  }
));


axios.get(host+'/ajax/loginUser')
.then(r=>{
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
