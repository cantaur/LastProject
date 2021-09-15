package com.project.pium.mapper;

import com.project.pium.domain.TaskcommentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TaskcommentMapper {
    List<TaskcommentDTO> selectAll();
    List<TaskcommentDTO> selectBySeq(long seq);
    void insert(TaskcommentDTO task);
    void delete(long seq);
    void update(TaskcommentDTO task);
}
