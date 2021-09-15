package com.project.pium.mapper;

import com.project.pium.domain.ProjectmemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ProjectmemberMapper {
    List<ProjectmemberDTO> selectAll();//전체조회
    List<ProjectmemberDTO> selectByPmseq(long projmember_seq);//플젝멤버번호로 조회
    List<ProjectmemberDTO> selectByMseq(long member_seq);//멤버 번호로 조회
    List<ProjectmemberDTO> selectByPmname(String projmember_name);//이름으로 조회
    String selectByBoss(String projmember_type);// 관리자 이름 찾기

    void insertByPm(ProjectmemberDTO projectmemberDTO);//추가
    void deleteByPm(long projmember_seq);//삭제
    void updateByPmName(ProjectmemberDTO projectmemberDTO);//이름 바꾸기
    void updateByPmImg(ProjectmemberDTO projectmemberDTO);//이미지 바꾸기
    void updateByPmTypeUp(long projmember_seq);//관리자 권환 획득
    void updateByPmTypeDown(long projmember_seq);//관리자 권환 상실
    


}
