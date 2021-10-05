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

    @GetMapping("/ajax/milestoneChart/{prjseq}")
    public long countMilestoneOne(@PathVariable long prjseq) {

        return chartService.countMilestoneStatusOneS(prjseq);
    }
    @GetMapping("/ajax/milestoneChart/{prjseq}")
    public long countMilestoneZero(@PathVariable long prjseq) {
        return chartService.countMilestoneStatusZeroS(prjseq);
    }
}





