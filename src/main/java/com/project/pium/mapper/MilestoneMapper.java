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
    //마일스톤 생성
    void createMile(MilestoneDTO milestoneDTO);
    //해당 프로젝트에서 생성된 전체 마일스톤 리스트
    List<MilestoneDTO> msListBySeq(long proSeq);
    //마일스톤 상세페이지
    MilestoneDTO findMilestoneByMileSeq(long mileSeq);
    //마일스톤 전체 수정
    void updateMilestone(MilestoneDTO milestoneDTO);










    String projMnameByMseq(long mileName);

    void delMile(long mileSeq);
    //반환타입 //methodName //parameter

    //마감상태 변경
    void upMsStatus(MilestoneDTO milestoneDTO);



    //isdel
    void upMsIsdel(MilestoneDTO milestoneDTO);
}