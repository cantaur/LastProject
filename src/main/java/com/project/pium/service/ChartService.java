package com.project.pium.service;

import com.project.pium.domain.ProjectmemberDTO;

public interface ChartService {

    long countMilestoneStatusZeroS(long project_seq);
    long countMilestoneStatusOneS(long project_seq);

    long countTaskAll(long project_seq);
    long countTaskMine(long project_seq, long projectMember_seq, long memberSeq);
}
