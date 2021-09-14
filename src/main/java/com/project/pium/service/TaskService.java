package com.project.pium.service;

import com.project.pium.domain.TaskDTO;

import java.util.List;

public interface TaskService {
    List<TaskDTO> selectAllS(); //전체조회
    List<TaskDTO> selectByMilestoneS(long seq); //마일스톤으로 조회
    List<TaskDTO> selectByStatusS(String status); //상태로 조회
    List<TaskDTO> selectByPriorityS(String priority); //중요도로 조회
    void insertS(TaskDTO task);
    void deleteS(long seq);
    void updateForStatusS(TaskDTO task);
    void updateAllS(TaskDTO task);
}
