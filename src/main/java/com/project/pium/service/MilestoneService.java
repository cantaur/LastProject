package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.ProjectDTO;

import java.util.List;

public interface MilestoneService {
    void createMile(MilestoneDTO milestoneDTO);
    List<MilestoneDTO>msListBySeq(long proSeq);
    List<MilestoneDTO>selectByMsSeq(long mileSeq);
    String projMnameByMseq(long mileName);
    void delMile(long mileSeq);
    //마감상태변경
    void upMsStatus(MilestoneDTO milestoneDTO);
    //  제목 변경
    void upMsName(MilestoneDTO milestoneDTO);
    //내용 변경
    void upMsContent(MilestoneDTO milestoneDTO);
    //isdel
    void upMsIsdel(MilestoneDTO milestoneDTO);
}

