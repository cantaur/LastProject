package com.project.pium.service;

import com.project.pium.domain.TaskDTO;
import com.project.pium.mapper.TaskMapper;

import java.util.List;

public class TaskServiceImpl implements TaskService {
    private TaskMapper mapper;

    @Override
    public List<TaskDTO> selectAllS() {return mapper.selectAll();}

    @Override
    public List<TaskDTO> selectByMilestoneS(long seq) {return mapper.selectByMilestone(seq);}

    @Override
    public List<TaskDTO> selectByStatusS(String status) {
        return mapper.selectByStatus(status);
    }

    @Override
    public List<TaskDTO> selectByPriorityS(String priority) {
        return mapper.selectByPriority(priority);
    }

    @Override
    public void insertS(TaskDTO task) {mapper.insert(task);}

    @Override
    public void deleteS(long seq) {mapper.delete(seq);}

    @Override
    public void updateForStatusS(TaskDTO task) {mapper.updateForStatus(task);}
    @Override
    public void updateAllS(TaskDTO task) {mapper.updateAll(task);}
}
