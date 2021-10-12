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
    public List<Long> countMilestone(@PathVariable long prjSeq) {
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
        log.info("chart2_prjSeq : "+prjSeq);
        log.info("chart2_prjMSeq : "+prjMSeq);
        log.info("chart2_MSeq : "+MSeq);
        long all = chartService.countTaskAll(prjSeq);
        long mine = chartService.countTaskMine(prjSeq, prjMSeq, MSeq);
        log.info("chart2_프로젝트 전체 업무 : "+all);
        log.info("chart2_나에게 할당된 업무 : "+mine);
        List<Long> list = new ArrayList<>();
        list.add(all);
        list.add(mine);
        log.info("chart2_list : "+list);
        return list;
    }
    //  chart 3
    @GetMapping("/ajax/countTaskStatus/{prj_seq}")
    public List<Long> countTask(@PathVariable long prj_seq){
        long progress = chartService.countTaskStatusZero(prj_seq);
        long completion = chartService.countTaskStatusOne(prj_seq);

        List<Long> list = new ArrayList<>();
        list.add(progress);
        list.add(completion);

        log.info("chart3_progress : "+ progress);
        log.info("chart3_completion : "+ completion);
        log.info("chart3_list : "+list);
        return list;
    }
    //  chart 4
    @GetMapping("/ajax/countAllMyTask/{prj_seq}/{prjMySeq}")
    public List<Long> countMyTask(@PathVariable long prj_seq, @PathVariable long prjMySeq){

        log.info("chart4_prjSeq : "+prj_seq);
        log.info("chart4_prjMySeq : "+prjMySeq);
        long all = chartService.countMyAllTask(prj_seq, prjMySeq);
        long end = chartService.countMyEndTask(prjMySeq, prj_seq);
        log.info("chart4_all : "+all);
        log.info("chart4_end : "+end);
        List<Long> list = new ArrayList<>();
        list.add(all);
        list.add(end);
        log.info("chart4_list : "+list);

        return list;
    }
}
