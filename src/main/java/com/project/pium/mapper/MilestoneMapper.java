package com.project.pium.mapper;

import com.project.pium.domain.MemberDTO;
import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.ProjectDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MilestoneMapper {
    void createMile(MilestoneDTO milestoneDTO);

    List<MilestoneDTO> msListBySeq(long proSeq);

    List<MilestoneDTO> selectByMsSeq(long mileSeq);

    String projMnameByMseq(long mileName);

    void delMile(long mileSeq);
    //반환타입 //methodName //parameter

    //마감상태 변경
    void upMsStatus(MilestoneDTO milestoneDTO);

    //  제목 변경
    void upMsName(MilestoneDTO milestoneDTO);

    //내용 변경
    void upMsContent(MilestoneDTO milestoneDTO);

    //isdel
    void upMsIsdel(MilestoneDTO milestoneDTO);
}