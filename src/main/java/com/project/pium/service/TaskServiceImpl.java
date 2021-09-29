package com.project.pium.service;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.mapper.TaskMapper;
import javafx.concurrent.Task;
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
    public List<TaskDTO> taskListByMile(long mileSeq){return taskMapper.taskListByMile(mileSeq);}

    @Override
    public TaskDTO showTaskByTaskseq(long taskSeq){return taskMapper.showTaskByTaskseq(taskSeq);}

    @Override
    public void updateTitle(TaskDTO task){taskMapper.updateTitle(task);}

    @Override
    public void updateContent(TaskDTO task){taskMapper.updateContent(task);}

    @Override
    public void updateMilestone(TaskDTO task){taskMapper.updateMilestone(task);}

    @Override
    public void updateStatusFinish(long taskSeq){taskMapper.updateStatusFinish(taskSeq);}

    @Override
    public void updateStatusDefault(long taskSeq){taskMapper.updateStatusDefault(taskSeq);}

    @Override
    public void updateIsdelete(long taskSeq){taskMapper.updateIsdelete(taskSeq);}

    @Override
    public void insertTaskMember(TaskmemberDTO taskmember){taskMapper.insertTaskMember(taskmember);}

    @Override
    public void updatePriority(TaskDTO task){taskMapper.updatePriority(task);}

    @Override
    public void updateDate(TaskDTO task){taskMapper.updateDate(task);}
}
