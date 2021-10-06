package com.project.pium.controller;


import com.project.pium.domain.ProjectmemberDTO;
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

//  chart 1
    @GetMapping("/ajax/milestoneOneChart/{prjSeq}")
    public List<Long> countChart(@PathVariable long prjSeq) {
        log.info("Pathvariable : "+ prjSeq);
        long a = chartService.countMilestoneStatusZeroS(prjSeq);
        long b = chartService.countMilestoneStatusOneS(prjSeq);
        List<Long> list = new ArrayList<>();
        list.add(a);
        list.add(b);
        log.info("차트1에서 받아오는 prjseq값 : "+prjSeq);
        log.info("milestone 진행중인 갯수 : "+ a);
        log.info("milestone 완료된 갯수 : "+ b);
        return list;
    }
//  chart 2
    @GetMapping("/ajax/taskChart/{prjSeq}/{prjMSeq}/{MSeq}")
    public List<Long> taskChart(@PathVariable long prjSeq, @PathVariable long prjMSeq, @PathVariable long MSeq) {
        log.info("prjSeq : "+prjSeq);
        log.info("prjMSeq : "+prjMSeq);
        log.info("MSeq : "+MSeq);
        long all = chartService.countTaskAll(prjSeq);
        long mine = chartService.countTaskMine(prjSeq, prjMSeq, MSeq);
        log.info("프로젝트 전체 업무 : "+all);
        log.info("나에게 할당된 업무 : "+mine);
        List<Long> list = new ArrayList<>();
        list.add(all);
        list.add(mine);
        log.info("list : "+list);
        return list;
    }

}
