import axios from "axios";
import React, { useEffect, useState,useRef,useCallback } from "react"
import {pub, colors, pages, host} from '../Helper.js'
import DatePicker from '../DatePicker.js'
import {FloatingLabel, Form, Button, Dropdown, Alert, Modal} from 'react-bootstrap'
import { Link, useParams, withRouter, useHistory } from "react-router-dom";
import {connect} from 'react-redux';



function FileList(p){

    return(
       <div>여기에서 렌더가 됩니다</div>
    )
}



function transReducer(state){
    return {
        loading : state.loading,
        datePickerModal : state.datePickerModal,
        projectInfo : state.projectInfo,
        pageInfo : state.pageInfo,
        myMemberInfo : state.myMemberInfo,
    }
}

export default connect(transReducer)(FileList);