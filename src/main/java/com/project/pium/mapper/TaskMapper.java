package com.project.pium.mapper;

import com.project.pium.domain.TaskDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TaskMapper {
    List<TaskDTO> selectAll(); //전체조회
    List<TaskDTO> selectByMilestone(long seq); //마일스톤으로 조회
    List<TaskDTO> selectByStatus(String status); //상태로 조회
    List<TaskDTO> selectByPriority(String priority); //중요도로 조회
    void insert(TaskDTO task);
    void delete(long seq);
    void updateForStatus(TaskDTO task);
    void updateAll(TaskDTO task);
}
