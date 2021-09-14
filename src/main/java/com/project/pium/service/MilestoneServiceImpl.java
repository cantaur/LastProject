package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.mapper.MilestoneMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Log
@AllArgsConstructor
@Service
public class MilestoneServiceImpl implements MilestoneService {

    private MilestoneMapper milestoneMapper;

    @Override
    public void createMile(MilestoneDTO milestoneDTO) {
        milestoneMapper.createMile(milestoneDTO);
    }

    @Override
    public List<MilestoneDTO> msListBySeq(long proSeq) {
        return milestoneMapper.msListBySeq(proSeq);
    }

    @Override
    public List<MilestoneDTO> selectByMsSeq(long mileSeq){
        return milestoneMapper.selectByMsSeq(mileSeq);
    }

    @Override
    public String projMnameByMseq(long mileName) {
        return milestoneMapper.projMnameByMseq(mileName);
    }

    @Override
    public void delMile(long mileSeq) {
        milestoneMapper.delMile(mileSeq);
    }
    //마감상태 변경
    @Override
    public void upStatus(long mileSeq, MilestoneDTO milestoneDTO) {
        milestoneMapper.upStatus(mileSeq, milestoneDTO);
    }


}
