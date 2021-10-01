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


    @Override
    public void insertCalMemo(CalendarDTO calendarDTO) {
        calendarMapper.insertCalMemo(calendarDTO);
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
