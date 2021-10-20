package com.project.pium.mapper;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;


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
    List<TaskmemberDTO> countMyAllTask(long project_seq);

    //    TimeLine
    List<MilestoneDTO> timelineMile(long project_seq);
    List<TaskDTO> timelineTask(long project_seq);
}
