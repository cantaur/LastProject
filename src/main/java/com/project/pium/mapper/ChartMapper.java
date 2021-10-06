package com.project.pium.mapper;

import com.project.pium.domain.ProjectmemberDTO;
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
    long countTaskMe(ProjectmemberDTO dto);

}
