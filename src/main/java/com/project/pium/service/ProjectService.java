package com.project.pium.service;

import com.project.pium.domain.ProjectDTO;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> myProject(long memberSeq);
    String insertProject(ProjectDTO projectDTO);






    List<ProjectDTO> listS();
    List<ProjectDTO> projectSelectProceeding();
    List<ProjectDTO> projectSelectEnd();

    void updateStatus(ProjectDTO projectDTO);
    void updateIsdelete(ProjectDTO projectDTO);
    void updateTitle(ProjectDTO projectDTO);
    void updateContent(ProjectDTO projectDTO);
    void updateProject(ProjectDTO projectDTO);
    void updateEnddate(ProjectDTO projectDTO);
}
