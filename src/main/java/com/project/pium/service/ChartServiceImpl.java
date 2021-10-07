package com.project.pium.service;

import com.project.pium.domain.ProjectmemberDTO;
import com.project.pium.mapper.ChartMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ChartServiceImpl implements ChartService {
    private ChartMapper chartMapper;

    @Override
    public long countMilestoneStatusZeroS(long project_seq) {
        return chartMapper.countMilestoneStatusZero(project_seq);
    }

    @Override
    public long countMilestoneStatusOneS(long project_seq) {
        return chartMapper.countMilestoneStatusOne(project_seq);
    }

    @Override
    public long countTaskAll(long project_seq) {
        return chartMapper.countTaskAll(project_seq);
    }

    @Override
    public long countTaskMine(long project_seq, long projectMember_seq, long memberSeq) {
        return chartMapper.countTaskMine(project_seq, projectMember_seq, memberSeq);
    }
}
