package com.project.pium.service;

import com.project.pium.domain.ProjectDTO;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> listS();
    List<ProjectDTO> projectSelectProceeding();
    List<ProjectDTO> projectSelectEnd();
    Long selectByMemberSeqS(String member_email);
    void insertS(ProjectDTO projectDTO);
    void updateStatus(ProjectDTO projectDTO);
    void updateIsdelete(ProjectDTO projectDTO);
    void updateTitle(ProjectDTO projectDTO);
    void updateContent(ProjectDTO projectDTO);
    void updateProject(ProjectDTO projectDTO);
    void updateEnddate(ProjectDTO projectDTO);
}
