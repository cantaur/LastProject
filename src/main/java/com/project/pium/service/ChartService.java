package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;

import java.util.List;

public interface ChartService {
    //    chart1
    long countMilestoneStatusZeroS(long project_seq);
    long countMilestoneStatusOneS(long project_seq);
    //    chart2
    long countTaskAll(long project_seq);
    long countTaskMine(long project_seq, long projectMember_seq, long memberSeq);
    //    chart3
    long countTaskStatusZero(long project_seq);
    long countTaskStatusOne(long project_seq);
    //    chart4
    List<TaskmemberDTO> countMyAllTask(long project_seq);

    //    TimeLine
    List<MilestoneDTO> timelineMile(long project_seq);
    List<TaskDTO> timelineTask(long project_seq);
}
