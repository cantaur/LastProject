package com.project.pium.service;

import com.project.pium.domain.TaskcommentDTO;

import java.util.List;

public interface TaskcommentService {
    List<TaskcommentDTO> selectAllS();
    List<TaskcommentDTO> selectBySeqS(long seq);
    void insertS(TaskcommentDTO task);
    void deleteS(long seq);
    void updateS(TaskcommentDTO task);
}
