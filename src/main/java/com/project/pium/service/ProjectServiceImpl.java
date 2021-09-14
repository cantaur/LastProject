package com.project.pium.service;

import com.project.pium.domain.ProjectDTO;
import com.project.pium.mapper.ProjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;

@Log
@AllArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private ProjectMapper projectMapper;

    @Override
    public List<ProjectDTO> listS() {
        return projectMapper.list();
    }

    @Override
    public Long selectByMemberSeqS(String member_email) {
        return projectMapper.selectByMemberSeq(member_email);
    }

    @Override
    public void insertS(ProjectDTO projectDTO) {
        projectMapper.insert(projectDTO);
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
}
