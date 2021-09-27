import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { DayPickerRangeController } from "react-dates";

import moment from "moment";
import "moment/locale/ko";
import { START_DATE, END_DATE } from 'react-dates/constants';

import {connect} from 'react-redux';



function DatePicker(p) {
  const [dates, setDates] = useState({ startDate: null, endDate: null });

  const defaultFocusedInput = "startDate";
  const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);
  const handleDatesChange = (dates) => {
    setDates(dates);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  const renderDate = (date) => {
    return date ? moment(date).format("YYYY-MM-DD") : null;
  };

  const handleCng = (dates) => {
    p.pickerDateCng({
      ...p.pickerDate, 
      [p.pickerStartKey]:renderDate(dates.startDate), 
      [p.pickerEndKey]:renderDate(dates.endDate)
    })
    handleDatesChange(dates)
  }

  return (
    <div className={'App '+ (p.datePickerModal?' on':'')}>
      <DayPickerRangeController
        startDate={p.pickerStartDate?moment(p.pickerStartDate, 'YYYY-MM-DD'):dates.startDate}
        endDate={p.pickerEndDate?moment(p.pickerEndDate, 'YYYY-MM-DD'):dates.endDate}
        onDatesChange={handleCng}
        focusedInput={focusedInput || defaultFocusedInput}
        onFocusChange={onFocusChange}
        numberOfMonths={2}
      />
      {
        p.completeKey 
        ?
          <div className="datePickerComplete">
            <p className="alertMsg">일정을 선택해주세요.</p>
            일정적용
          </div>
        :
          <div className="datePickerComplete" style={{'padding':'4px 10px'}} onClick={p.dateModalClose}>
            <i class="fas fa-times"></i>
          </div>

      }
    </div>
  );
}

function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(DatePicker);
