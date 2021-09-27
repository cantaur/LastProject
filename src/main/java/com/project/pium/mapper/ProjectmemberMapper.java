package com.project.pium.mapper;

import com.project.pium.domain.ProjectmemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Mapper
@Repository
public interface ProjectmemberMapper {
    //프로필 수정
    void updateProfile(ProjectmemberDTO projectmemberDTO);
    //프로젝트seq와 멤버seq로 프로젝트멤버 seq 찾기
    long findProjMemberSeq(@Param("project_seq") long projSeq, @Param("member_seq")long memSeq);
    ProjectmemberDTO showImage(long projmember_seq);





//    List<ProjectmemberDTO> selectByPmseq(long projmember_seq);//플젝멤버번호로 조회
//    List<ProjectmemberDTO> selectByMseq(long member_seq);//멤버 번호로 조회
//    List<ProjectmemberDTO> selectByPmname(String projmember_name);//이름으로 조회
//    String selectByBoss(String projmember_type);// 관리자 이름 찾기
//
//
//    void deleteByPm(long projmember_seq);//삭제
//    void updateByPmTypeUp(long projmember_seq);//관리자 권환 획득
//    void updateByPmTypeDown(long projmember_seq);//관리자 권환 상실
    


}
