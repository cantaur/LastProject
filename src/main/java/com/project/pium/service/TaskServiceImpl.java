package com.project.pium.service;

import com.project.pium.domain.TaskDTO;
import com.project.pium.mapper.TaskMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;

@Log
@AllArgsConstructor
@Service
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
    public void updateForStatusS(long seq) {mapper.updateForStatus(seq);}
    @Override
    public void updateForStatusZeroS(long seq) {mapper.updateForStatusZero(seq);}
    @Override
    public void updateAllS(TaskDTO task) {mapper.updateAll(task);}
}
