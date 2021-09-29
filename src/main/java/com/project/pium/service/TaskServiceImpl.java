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
    private TaskMapper taskMapper;

    @Override
    public void createTask(TaskDTO taskDTO) {
        taskMapper.createTask(taskDTO);
    }

    @Override
    public List<TaskDTO> taskList(long projSeq) {
        return taskMapper.taskList(projSeq);
    }

    @Override
    public int countTask(long mileSeq) {
        return taskMapper.countTask(mileSeq);
    }

    @Override
    public int countClosedTask(long mileSeq) {
        return taskMapper.countClosedTask(mileSeq);
    }

    @Override
    public List<TaskDTO> selectAllS() {return taskMapper.selectAll();}
    @Override
    public List<TaskDTO> selectByMilestoneS(long seq) {return taskMapper.selectByMilestone(seq);}
    @Override
    public List<TaskDTO> selectByStatusS(String status) {
        return taskMapper.selectByStatus(status);
    }
    @Override
    public List<TaskDTO> selectByPriorityS(String priority) {
        return taskMapper.selectByPriority(priority);
    }


    @Override
    public void deleteS(long seq) {taskMapper.delete(seq);}
    @Override
    public void updateForStatusS(long seq) {taskMapper.updateForStatus(seq);}
    @Override
    public void updateForStatusZeroS(long seq) {taskMapper.updateForStatusZero(seq);}
    @Override
    public void updateAllS(TaskDTO task) {taskMapper.updateAll(task);}
}
