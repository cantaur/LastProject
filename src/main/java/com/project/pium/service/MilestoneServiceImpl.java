package com.project.pium.service;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.mapper.MilestoneMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

@Log
@AllArgsConstructor
@Service
public class MilestoneServiceImpl implements MilestoneService {

    private MilestoneMapper milestoneMapper;

    @Override
    public void insertTest(MilestoneDTO milestoneDTO) {
        milestoneMapper.insertTest(milestoneDTO);

    }
}
