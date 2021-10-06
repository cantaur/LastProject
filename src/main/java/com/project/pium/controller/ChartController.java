package com.project.pium.controller;


import com.project.pium.service.ChartService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;


@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class ChartController {
    private ChartService chartService;

    //겟맵핑 다음에 오는 주소 겹치면 안되어서 살짝 수정해서 git push
    @GetMapping("/ajax/milestoneoneChart/{prjseq}")
    public long countMilestoneOne(@PathVariable long prjseq) {

        return chartService.countMilestoneStatusOneS(prjseq);
    }
    @GetMapping("/ajax/milestonezeroChart/{prjseq}")
    public long countMilestoneZero(@PathVariable long prjseq) {
        return chartService.countMilestoneStatusZeroS(prjseq);
    }
}





