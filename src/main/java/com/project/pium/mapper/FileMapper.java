package com.project.pium.mapper;

import com.project.pium.domain.FileDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FileMapper {
    //파일 저장
    void saveFile(FileDTO fileDTO);
    FileDTO findById(String fileId);

}
