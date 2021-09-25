package com.project.pium.mapper;

import com.project.pium.domain.ProjectDTO;
import com.project.pium.domain.ProjectmemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProjectMapper {
    //유저가 참여중인 프로젝트
    List<ProjectDTO> myProject(long memberSeq);
    //프로젝트 생성
    void insertProject(ProjectDTO projectDTO);
    //프로젝트 생성 시 프로젝트 멤버 테이블에 관리자 셋팅
    int insertManager(@Param("project_seq") long projSeq, @Param("member_seq") long memSeq);
    //프로젝트 seq 검색
    long findSeq();







    List<ProjectDTO> projectSelectAll();
    List<ProjectDTO> projectSelectProceeding();
    List<ProjectDTO> projectSelectEnd();

    void updateStatus(ProjectDTO projectDTO);
    void updateIsdelete(ProjectDTO projectDTO);
    void updateTitle(ProjectDTO projectDTO);
    void updateContent(ProjectDTO projectDTO);
    void updateProject(ProjectDTO projectDTO);
    void updateEnddate(ProjectDTO projectDTO);
}
