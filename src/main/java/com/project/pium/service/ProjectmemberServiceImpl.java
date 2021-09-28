package com.project.pium.service;

import com.project.pium.domain.ProjectmemberDTO;
import com.project.pium.mapper.ProjectMapper;
import com.project.pium.mapper.ProjectmemberMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
@Log
@AllArgsConstructor
@Service

public class ProjectmemberServiceImpl implements ProjectmemberService  {
    private ProjectmemberMapper projectmemberMapper;

    @Override
    public void updateProfileS(ProjectmemberDTO projectmemberDTO){
        log.info("#projectmemberDTO : "+projectmemberDTO);

        projectmemberMapper.updateProfile(projectmemberDTO);
    }

    @Override
    public long findProjMemberSeq(long projSeq, long memSeq) {
        return projectmemberMapper.findProjMemberSeq(projSeq,memSeq);
    }

    @Override
    public ProjectmemberDTO showImage(long projmember_seq) {
        return projectmemberMapper.showImage(projmember_seq);
    }

    @Override
    public List<ProjectmemberDTO> allProjMembers(long projSeq) {
        return projectmemberMapper.allProjMembers(projSeq);
    }

    @Override
    public void mastergetS(long projmember_seq) {
        projectmemberMapper.masterget(projmember_seq);
    }

    @Override
    public void projectoutS(long project_seq, long projmember_seq) {
        projectmemberMapper.projectout(project_seq, projmember_seq);
    }

    @Override
    public void projectexitS(long project_seq, long projmember_seq) {
    projectmemberMapper.projectexit(project_seq, projmember_seq);
    }

}
