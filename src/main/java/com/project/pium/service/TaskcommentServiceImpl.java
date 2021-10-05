package com.project.pium.service;

import com.project.pium.domain.TaskcommentDTO;
import com.project.pium.mapper.TaskcommentMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskcommentServiceImpl implements TaskcommentService {

    private TaskcommentMapper taskcommentMapper;

    //해당 업무를 클릭했을때 오른쪽에서 튀어나오는 업무 상세창의 comment 탭을 눌렀을때 나오는 모든 코멘트를 조회
    @Override
    public List<TaskcommentDTO> selectBySeqS(long taskSeq) {return taskcommentMapper.selectBySeq(taskSeq);}

    //task insertComment
    @Override
    public void insertS(TaskcommentDTO task) {taskcommentMapper.insert(task);}

    // task comment isdel 상태로 변경
    @Override
    public void deleteS(long seq) {taskcommentMapper.delete(seq);}

    // task comment 수정
    @Override
    public void updateS(TaskcommentDTO task) {taskcommentMapper.update(task);}
}
