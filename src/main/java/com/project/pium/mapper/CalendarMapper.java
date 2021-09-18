package com.project.pium.mapper;

import com.project.pium.domain.CalendarDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CalendarMapper {
    
    //달력 입력
    void createCal(CalendarDTO calendarDTO);

    //달력 리스트 출력
    List<CalendarDTO> calList();

    //달력 list byseq 조회
    List<CalendarDTO> calListBySeq(long calSeq);

    //달력 list byProSeq 조회
    List<CalendarDTO> calListByProSeq(long calProSeq);

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
