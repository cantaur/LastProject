package com.project.pium.mapper;

import com.project.pium.domain.NoticeDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface NoticeMapper {
    void mentionedMember(NoticeDTO noticeDTO);

}
