package com.project.pium.service;

import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.mapper.TaskmemberMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;
@Log
@AllArgsConstructor
@Service
public class TaskmemberServiceImpl implements TaskmemberService{
    private TaskmemberMapper mapper;

    @Override
    public List<TaskmemberDTO> selectAllS() { //전체 조회
        return mapper.selectAll();
    }

    @Override
    public List<TaskmemberDTO> selectByTmS(long taskmember_seq) { // 업무멤버번호로 조회
        return mapper.selectByTm(taskmember_seq);
    }

    @Override
    public List<TaskmemberDTO> selectTS(long task_seq) { //업무 번호로 조회
        return mapper.selectT(task_seq);
    }

    @Override
    public List<TaskmemberDTO> selectByPmS(long projmember_seq) { //플젝멤버번호로 조회
        return mapper.selectByPm(projmember_seq);
    }

    @Override
    public void insertByTmS(TaskmemberDTO DTO) {
        mapper.insertByTm(DTO);
    }

    @Override
    public void deleteS(long taskmember_seq) {
        mapper.delete(taskmember_seq);
    }
}
