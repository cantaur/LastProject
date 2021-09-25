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

  return (
    <div className={'App '+ (p.datePickerModal?' on':'')}>
      <DayPickerRangeController
        startDate={p.stDate != ''?moment(p.stDate, 'YYYY-MM-DD'):dates.startDate}
        endDate={p.edDate != ''?moment(p.edDate, 'YYYY-MM-DD'):dates.endDate}
        onDatesChange={handleDatesChange,
          p.prjInfoCng({...p.prjInfo, stDate:dates.startDate, edDate:dates.endDate})
        }
        focusedInput={focusedInput || defaultFocusedInput}
        onFocusChange={onFocusChange}
        numberOfMonths={2}
      />
      <p className="datePickerComplete">완료</p>
    </div>
  );
}

function transReducer(state){
  return {
    datePickerModal : state.datePickerModal,
  }
}

export default connect(transReducer)(DatePicker);
