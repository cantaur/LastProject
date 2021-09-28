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
    public MilestoneDTO findMilestoneByMileSeq(long mileSeq){
        return milestoneMapper.findMilestoneByMileSeq(mileSeq);
    }

    @Override
    public void updateMilestone(MilestoneDTO milestoneDTO) {
        milestoneMapper.updateMilestone(milestoneDTO);
    }

    @Override
    public void setDateEmpty(long mileSeq) {
        milestoneMapper.setDateEmpty(mileSeq);
    }

    @Override
    public int closeMilestone(long mileSeq) {
        return milestoneMapper.closeMilestone(mileSeq);
    }

    @Override
    public int openMilestone(long mileSeq) {
        return milestoneMapper.openMilestone(mileSeq);
    }

    @Override
    public int delMilestone(long mileSeq) {
        return milestoneMapper.delMilestone(mileSeq);
    }


}
