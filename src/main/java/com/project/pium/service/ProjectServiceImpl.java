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
}
