package com.project.pium.mapper;

import com.project.pium.domain.TasklogDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TasklogMapper {
    List<TasklogDTO> tasklogList(long task_seq);
    void insertCreate(TasklogDTO tasklogDTO);
    void insertTitleUpdate(TasklogDTO tasklogDTO);
    void insertContentUpdate(TasklogDTO tasklogDTO);
    void insertDateUpdate(TasklogDTO tasklogDTO);
    void insertPriorityUpdate(TasklogDTO tasklogDTO);
    void insertLabelUpdate(TasklogDTO tasklogDTO);
    void insertDelete(TasklogDTO tasklogDTO);
    void insertRestore(TasklogDTO tasklogDTO);
    void insertEnd(TasklogDTO tasklogDTO);
    void insertFileUpload(TasklogDTO tasklogDTO);
    void insertFileDelete(TasklogDTO tasklogDTO);


}
