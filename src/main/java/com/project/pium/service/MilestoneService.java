package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;

import java.util.List;

public interface MilestoneService {
    void createMile(MilestoneDTO milestoneDTO);
    List<MilestoneDTO>msListBySeq(long proSeq);
    List<MilestoneDTO>selectByMsSeq(long mileSeq);
    String projMnameByMseq(long mileName);
    void delMile(long mileSeq);
    //마감상태변경
    void upStatus(long mileSeq, MilestoneDTO milestoneDTO);
}
