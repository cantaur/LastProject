package com.project.pium.mapper;


import com.project.pium.domain.LabelDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;



@Mapper
@Repository
public interface WorklabelMapper {
    LabelDTO findLabelTitle(long labelSeq);

}
