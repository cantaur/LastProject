package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.ProjectDTO;

import java.util.List;

public interface MilestoneService {
    void createMile(MilestoneDTO milestoneDTO);
    List<MilestoneDTO>msListBySeq(long proSeq);
    MilestoneDTO findMilestoneByMileSeq(long mileSeq);
    void updateMilestone(MilestoneDTO milestoneDTO);
    int closeMilestone(long mileSeq);
    //마감상태(재오픈) 변경
    int openMilestone(long mileSeq);
    //isdel
    int delMilestone(long mileSeq);









}

