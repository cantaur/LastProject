package com.project.pium.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


@Mapper
@Repository
public interface ChartMapper {

    //MileStone Chart
    long countMilestoneStatusZero(long project_seq);
    long countMilestoneStatusOne(long project_seq);
    long countTaskAll(long project_seq);
    long countTaskMine(long project_seq, long projmember_seq, long member_seq);
    long countTaskStatusZero(long project_seq);
    long countTaskStatusOne(long project_seq);
    long countMyAllTask(long project_seq, long projmember_seq);
    long countMyEndTask(long projmember_seq, long project_seq);
}
