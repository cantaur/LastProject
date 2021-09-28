package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.ProjectDTO;

import java.util.List;

public interface MilestoneService {
    void createMile(MilestoneDTO milestoneDTO);
    List<MilestoneDTO>msListBySeq(long proSeq);
    MilestoneDTO findMilestoneByMileSeq(long mileSeq);
    void updateMilestone(MilestoneDTO milestoneDTO);










    String projMnameByMseq(long mileName);
    void delMile(long mileSeq);
    //마감상태변경
    void upMsStatus(MilestoneDTO milestoneDTO);

    //isdel
    void upMsIsdel(MilestoneDTO milestoneDTO);
}

