package com.project.pium.service;

import com.project.pium.domain.CalendarDTO;

import java.util.List;

public interface CalendarService {

    //달력 멤버 리스트 뽑기 (달력에 포함되는거로 추후에)
    //달력 메모 입력
    List<CalendarDTO> insertCalMemo(CalendarDTO calendarDTO);
    //달력 메모 수정
    void updateCalMemo(CalendarDTO calendarDTO);
    //달력 메모 삭제
    void DelCalMemo(long calMemoSeq);


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
