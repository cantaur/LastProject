package com.project.pium.service;

import com.project.pium.domain.CalendarDTO;
import com.project.pium.domain.TaskDTO;

import java.util.List;

public interface CalendarService {


    // MEMO 삽입
    void insertCalMemo(CalendarDTO calendarDTO);

    List<CalendarDTO> calListByProjSeq(long projSeq);
    //해당 프로젝트에서 생성된 업무 리스트 조회(날짜 없는 데이터는 제외)
    List<TaskDTO> taskListByProjSeq(long projSeq);

    void upCalName(CalendarDTO calendarDTO);
    void upCalContent(CalendarDTO calendarDTO);
    void upCalDate(CalendarDTO calendarDTO);
    void upCalSdate(CalendarDTO calendarDTO);
    void upCalEdate(CalendarDTO calendarDTO);
    void delCal(long calSeq);
}
