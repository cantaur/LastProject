package com.project.pium.service;

import com.project.pium.domain.TasklogDTO;
import com.project.pium.mapper.TaskMapper;
import com.project.pium.mapper.TasklogMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TasklogServiceImpl implements TasklogService {

    private TasklogMapper tasklogMapper;

    @Override
    public List<TasklogDTO> tasklogListS(long task_seq) {
        return tasklogMapper.tasklogList(task_seq);
    }

    @Override
    public void insertCreateS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertCreate(tasklogDTO);
    }

    @Override
    public void insertTitleUpdateS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertTitleUpdate(tasklogDTO);
    }

    @Override
    public void insertContentUpdateS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertContentUpdate(tasklogDTO);
    }

    @Override
    public void insertDateUpdateS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertDateUpdate(tasklogDTO);
    }

    @Override
    public void insertPriorityUpdateS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertPriorityUpdate(tasklogDTO);
    }

    @Override
    public void insertLabelUpdateS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertLabelUpdate(tasklogDTO);
    }

    @Override
    public void insertDeleteS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertDelete(tasklogDTO);
    }

    @Override
    public void insertRestoreS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertRestore(tasklogDTO);
    }

    @Override
    public void insertEndS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertEnd(tasklogDTO);
    }

    @Override
    public void insertFileUploadS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertFileUpload(tasklogDTO);
    }

    @Override
    public void insertFileDeleteS(TasklogDTO tasklogDTO) {
        tasklogMapper.insertFileDelete(tasklogDTO);
    }
}
