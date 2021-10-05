package com.project.pium.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChartMapper {

    //MileStone Chart
    long countMilestoneStatusZero(long seq);
    long countMilestoneStatusOne(long seq);

}
