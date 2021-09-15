package com.project.pium.mapper;

import com.project.pium.domain.TaskmemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TaskmemberMapper {
    List<TaskmemberDTO> selectAll(); //전체조회
    List<TaskmemberDTO> selectByTm(long taskmember_seq); //업무 멤버번호로 조회
    List<TaskmemberDTO> selectByT(long task_seq); // 업무 번호로 조회
    List<TaskmemberDTO> selectByPm(long projmember_seq); //플젝멤버번호로 조회

    void insertByTm(TaskmemberDTO DTO); //추가
    void delete(long Taskmember_seq); //삭제
}
