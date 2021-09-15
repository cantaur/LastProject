package com.project.pium.mapper;

import com.project.pium.domain.CalenderDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CalenderMapper {
    
    //달력 입력
    void createCal(CalenderDTO calenderDTO);

    //달력 리스트 출력
    List<CalenderDTO> calList();

    //달력 list byseq 조회
    List<CalenderDTO> calListBySeq(long calSeq);

    //달력 list byProSeq 조회
    List<CalenderDTO> calListByProSeq(long calProSeq);

    //달력 title 수정
    void upCalName(CalenderDTO calenderDTO);

    //달력 content 수정
    void upCalContent(CalenderDTO calenderDTO);

    //달력 date 수정
    void upCalDate(CalenderDTO calenderDTO);

    //달력 startdate 수정
    void upCalSdate(CalenderDTO calenderDTO);

    //달력 enddate 수정
    void upCalEdate(CalenderDTO calenderDTO);

    //달력 seq 삭제
    void delCal(long calSeq);
    
}
