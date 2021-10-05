package com.project.pium.service;

import com.project.pium.mapper.ChartMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChartServiceImpl implements ChartService {
    private ChartMapper chartMapper;

    @Override
    public long countMilestoneStatusZeroS(long seq) {
        return chartMapper.countMilestoneStatusZero(seq);
    }

    @Override
    public long countMilestoneStatusOneS(long seq) {
        return chartMapper.countMilestoneStatusOne(seq);
    }
}
