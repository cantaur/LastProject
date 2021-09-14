package com.project.pium.mapper;

import com.project.pium.domain.ProjectDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProjectMapper {
    List<ProjectDTO> list();
    Long selectByMemberSeq(String member_email);
    void insert(ProjectDTO projectDTO);
    void updateStatus(ProjectDTO projectDTO);
    void updateIsdelete(ProjectDTO projectDTO);
    void updateTitle(ProjectDTO projectDTO);
    void updateContent(ProjectDTO projectDTO);
    void updateProject(ProjectDTO projectDTO);
}
