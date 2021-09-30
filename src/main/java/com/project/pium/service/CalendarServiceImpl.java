package com.project.pium.service;

import com.project.pium.domain.CalendarDTO;
import com.project.pium.mapper.CalendarMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;

@Log
@AllArgsConstructor
@Service
public class CalendarServiceImpl implements CalendarService {

    private CalendarMapper calendarMapper;

    // 달력 MEMO 입력
    @Override
    public List<CalendarDTO> insertCalMemo(CalendarDTO calendarDTO) {
        calendarMapper.insertCalMemo(calendarDTO);
        return null;
    }
    // 달력 MEMO 수정
    @Override
    public void updateCalMemo(CalendarDTO calendarDTO) {
        calendarMapper.updateCalMemo(calendarDTO);
    }
    // 달력 MEMO 삭제
    @Override
    public void DelCalMemo(long calMemoSeq) {
        calendarMapper.DelCalMemo(calMemoSeq);
    }

    @Override
    public void creatCal(CalendarDTO calendarDTO) {
     calendarMapper.createCal(calendarDTO);
    }

    @Override
    public List<CalendarDTO> calList() {
       return calendarMapper.calList();
    }

    @Override
    public List<CalendarDTO> calListBySeq(long calSeq) {
       return calendarMapper.calListBySeq(calSeq);
    }

    @Override
    public List<CalendarDTO> calListByProSeq(long calProSeq) {
        return calendarMapper.calListByProSeq(calProSeq);
    }

    @Override
    public void upCalName(CalendarDTO calendarDTO) {
        calendarMapper.upCalName(calendarDTO);
    }

    @Override
    public void upCalContent(CalendarDTO calendarDTO) {
        calendarMapper.upCalContent(calendarDTO);
    }

    @Override
    public void upCalDate(CalendarDTO calendarDTO) {
        calendarMapper.upCalDate(calendarDTO);
    }

    @Override
    public void upCalSdate(CalendarDTO calendarDTO) {
        calendarMapper.upCalSdate(calendarDTO);
    }

    @Override
    public void upCalEdate(CalendarDTO calendarDTO) {
        calendarMapper.upCalEdate(calendarDTO);
    }

    @Override
    public void delCal(long calSeq) {
        calendarMapper.delCal(calSeq);
    }
}
