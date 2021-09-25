package com.project.pium.service;

import com.project.pium.domain.ProjectDTO;
import com.project.pium.mapper.ProjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log
@AllArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private ProjectMapper projectMapper;

    @Override
    public List<ProjectDTO> myProject(long memberSeq) {
        return projectMapper.myProject(memberSeq);
    }


    //로그인한 유저가 참여 중인 모든 프로젝트 리스트
    //프로젝트 테이블과 프로젝트멤버 테이블에 동시에 인서트 되지 않으면 테이블에 추가되지 않도록 트랜젝션 처리
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public String insertProject(ProjectDTO projectDTO){
        log.info("#프로젝트생성중: "+projectDTO);
        projectMapper.insertProject(projectDTO);
        long memSeq = projectDTO.getMember_seq();
        log.info("memSeq"+memSeq);
        long lastProjSeq = projectMapper.findSeq();
        log.info("#last: "+lastProjSeq);
        int flag= projectMapper.insertManager(lastProjSeq,memSeq);
        if(flag ==1){
            return "success";
        }else{
            return "fail";
        }


    }














    @Override
    public List<ProjectDTO> listS() {
        return projectMapper.projectSelectAll();
    }

    @Override
    public List<ProjectDTO> projectSelectProceeding() {
        return projectMapper.projectSelectProceeding();
    }

    @Override
    public List<ProjectDTO> projectSelectEnd() {
        return projectMapper.projectSelectEnd();
    }




    @Override
    public void updateStatus(ProjectDTO projectDTO) {
        projectMapper.updateStatus(projectDTO);
    }

    @Override
    public void updateIsdelete(ProjectDTO projectDTO) {
        projectMapper.updateIsdelete(projectDTO);
    }

    @Override
    public void updateTitle(ProjectDTO projectDTO) {
        projectMapper.updateTitle(projectDTO);
    }

    @Override
    public void updateContent(ProjectDTO projectDTO) {
        projectMapper.updateContent(projectDTO);
    }

    @Override
    public void updateProject(ProjectDTO projectDTO) {
        projectMapper.updateProject(projectDTO);
    }

    @Override
    public void updateEnddate(ProjectDTO projectDTO) {
        projectMapper.updateEnddate(projectDTO);
    }
}
