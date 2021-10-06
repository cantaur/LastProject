package com.project.pium.controller;


import com.project.pium.service.ChartService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class ChartController {
    private ChartService chartService;

    @GetMapping("/ajax/milestoneoneChart/{prjseq}")
    public List<Long> countChart(@PathVariable long prjseq) {
        log.info("Pathvariable : "+ prjseq);
        long a = chartService.countMilestoneStatusZeroS(prjseq);
        long b = chartService.countMilestoneStatusOneS(prjseq);
        List<Long> list = new ArrayList<>();
        list.add(a);
        list.add(b);
        log.info("차트1에서 받아오는 prjseq값 : "+prjseq);
        log.info("milestone 진행중인 갯수 : "+ a);
        log.info("milestone 완료된 갯수 : "+ b);
        return list;
    }

    @GetMapping("/ajax/taskChart/{prjseq}")
    public long taskChart(@PathVariable long prjseq) {
        return 0;
    }

}