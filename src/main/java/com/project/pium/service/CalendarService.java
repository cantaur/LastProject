package com.project.pium.service;

import com.project.pium.domain.CalendarDTO;

import java.util.List;

public interface CalendarService {

    void creatCal(CalendarDTO calendarDTO);
    List<CalendarDTO> calList();
    List<CalendarDTO> calListBySeq (long calSeq);
    List<CalendarDTO> calListByProSeq (long calProSeq);
    void upCalName(CalendarDTO calendarDTO);
    void upCalContent(CalendarDTO calendarDTO);
    void upCalDate(CalendarDTO calendarDTO);
    void upCalSdate(CalendarDTO calendarDTO);
    void upCalEdate(CalendarDTO calendarDTO);
    void delCal(long calSeq);
}
