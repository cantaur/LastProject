package com.project.pium.service;

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
    long countMyAllTask(long project_seq, long projMember_seq);
    long countMyEndTask(long projmember_seq, long project_seq);
}
