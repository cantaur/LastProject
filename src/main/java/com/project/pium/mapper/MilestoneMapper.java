package com.project.pium.mapper;

import com.project.pium.domain.MilestoneDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MilestoneMapper {
    void insertTest(MilestoneDTO milestoneDTO);

}
