package com.project.pium.service;

import com.project.pium.domain.TaskcommentDTO;
import com.project.pium.mapper.TaskcommentMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskcommentServiceImpl implements TaskcommentService {
    private TaskcommentMapper mapper;

    @Override
    public List<TaskcommentDTO> selectAllS() {return mapper.selectAll();}
    @Override
    public List<TaskcommentDTO> selectBySeqS(long seq) {return mapper.selectBySeq(seq);}

    @Override
    public void insertS(TaskcommentDTO task) {mapper.insert(task);}

    @Override
    public void deleteS(long seq) {mapper.delete(seq);}
    @Override
    public void updateS(TaskcommentDTO task) {mapper.update(task);}
}
