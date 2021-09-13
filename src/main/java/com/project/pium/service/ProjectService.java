package com.project.pium.service;

import com.project.pium.domain.ProjectDTO;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> listS();
    Long selectByMemberSeqS(String member_email);
    void insertS(ProjectDTO projectDTO);
}
