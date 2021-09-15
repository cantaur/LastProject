package com.project.pium.service;

import com.project.pium.domain.TasklogDTO;

import java.util.List;

public interface TasklogService {
    List<TasklogDTO> tasklogListS(long task_seq);
    void insertCreateS(TasklogDTO tasklogDTO);
    void insertTitleUpdateS(TasklogDTO tasklogDTO);
    void insertContentUpdateS(TasklogDTO tasklogDTO);
    void insertDateUpdateS(TasklogDTO tasklogDTO);
    void insertPriorityUpdateS(TasklogDTO tasklogDTO);
    void insertLabelUpdateS(TasklogDTO tasklogDTO);
    void insertDeleteS(TasklogDTO tasklogDTO);
    void insertRestoreS(TasklogDTO tasklogDTO);
    void insertEndS(TasklogDTO tasklogDTO);
    void insertFileUploadS(TasklogDTO tasklogDTO);
    void insertFileDeleteS(TasklogDTO tasklogDTO);
}
