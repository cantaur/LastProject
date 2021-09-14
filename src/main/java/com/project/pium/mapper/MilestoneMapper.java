package com.project.pium.mapper;

import com.project.pium.domain.MemberDTO;
import com.project.pium.domain.MilestoneDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MilestoneMapper {
    void createMile(MilestoneDTO milestoneDTO);
    List<MilestoneDTO>msListBySeq(long proSeq);
    List<MilestoneDTO>selectByMsSeq(long mileSeq);
    String projMnameByMseq(long mileName);
    void delMile (long mileSeq);
    //반환타입 //methodName //parameter

    //마감상태 변경
    void upStatus(long mileSeq, MilestoneDTO milestoneDTO);
}
