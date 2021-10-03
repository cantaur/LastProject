package com.project.pium.mapper;

import com.project.pium.domain.CalendarDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CalendarMapper {

    //달력 MeMo 입력
    void insertCalMemo(CalendarDTO calendarDTO);

    //달력 list byProSeq 조회
    List<CalendarDTO> calListByProjSeq(long projSeq);

















    //달력 title 수정
    void upCalName(CalendarDTO calendarDTO);

    //달력 content 수정
    void upCalContent(CalendarDTO calendarDTO);

    //달력 date 수정
    void upCalDate(CalendarDTO calendarDTO);

    //달력 startdate 수정
    void upCalSdate(CalendarDTO calendarDTO);

    //달력 enddate 수정
    void upCalEdate(CalendarDTO calendarDTO);

    //달력 seq 삭제
    void delCal(long calSeq);
    
}
