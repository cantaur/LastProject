package com.project.pium.service;

import com.project.pium.domain.CalendarDTO;

import java.util.List;

public interface CalendarService {


    // MEMO 삽입
    void insertCalMemo(CalendarDTO calendarDTO);

    List<CalendarDTO> calListByProjSeq(long projSeq);

    void upCalName(CalendarDTO calendarDTO);
    void upCalContent(CalendarDTO calendarDTO);
    void upCalDate(CalendarDTO calendarDTO);
    void upCalSdate(CalendarDTO calendarDTO);
    void upCalEdate(CalendarDTO calendarDTO);
    void delCal(long calSeq);
}
