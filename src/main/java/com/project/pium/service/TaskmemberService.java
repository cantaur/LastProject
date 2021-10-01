package com.project.pium.service;

import com.project.pium.domain.TaskmemberDTO;

import java.util.List;

public interface TaskmemberService {

    List<TaskmemberDTO> selectByTaskSeq(long task_seq); // 업무 번호로 조회



    List<TaskmemberDTO> selectByTmS(long taskmember_seq); //업무 멤버번호로 조회

    List<TaskmemberDTO> selectByPmS(long projmember_seq); //플젝멤버번호로 조회

    void insertByTmS(TaskmemberDTO DTO); //추가
    void deleteS(long Taskmember_seq); //삭제
}
