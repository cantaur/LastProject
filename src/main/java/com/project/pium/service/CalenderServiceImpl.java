package com.project.pium.service;

import com.project.pium.domain.CalenderDTO;
import com.project.pium.domain.MilestoneDTO;
import com.project.pium.mapper.CalenderMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;

@Log
@AllArgsConstructor
@Service
public class CalenderServiceImpl implements CalenderService {

    private CalenderMapper calenderMapper;

    @Override
    public void creatCal(CalenderDTO calenderDTO) {
     calenderMapper.createCal(calenderDTO);
    }

    @Override
    public List<CalenderDTO> calList() {
       return calenderMapper.calList();
    }

    @Override
    public List<CalenderDTO> calListBySeq(long calSeq) {
       return calenderMapper.calListBySeq(calSeq);
    }

    @Override
    public List<CalenderDTO> calListByProSeq(long calProSeq) {
        return calenderMapper.calListByProSeq(calProSeq);
    }

    @Override
    public void upCalName(CalenderDTO calenderDTO) {
        calenderMapper.upCalName(calenderDTO);
    }

    @Override
    public void upCalContent(CalenderDTO calenderDTO) {
        calenderMapper.upCalContent(calenderDTO);
    }

    @Override
    public void upCalDate(CalenderDTO calenderDTO) {
        calenderMapper.upCalDate(calenderDTO);
    }

    @Override
    public void upCalSdate(CalenderDTO calenderDTO) {
        calenderMapper.upCalSdate(calenderDTO);
    }

    @Override
    public void upCalEdate(CalenderDTO calenderDTO) {
        calenderMapper.upCalEdate(calenderDTO);
    }

    @Override
    public void delCal(long calSeq) {
        calenderMapper.delCal(calSeq);
    }
}
