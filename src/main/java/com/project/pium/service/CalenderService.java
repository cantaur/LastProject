package com.project.pium.service;

import com.project.pium.domain.CalenderDTO;
import com.project.pium.mapper.CalenderMapper;

import java.util.List;

public interface CalenderService {

    void creatCal(CalenderDTO calenderDTO);
    List<CalenderDTO> calList();
    List<CalenderDTO> calListBySeq (long calSeq);
    List<CalenderDTO> calListByProSeq (long calProSeq);
    void upCalName(CalenderDTO calenderDTO);
    void upCalContent(CalenderDTO calenderDTO);
    void upCalDate(CalenderDTO calenderDTO);
    void upCalSdate(CalenderDTO calenderDTO);
    void upCalEdate(CalenderDTO calenderDTO);
    void delCal(long calSeq);
}
