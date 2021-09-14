package com.project.pium.controller;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.service.MilestoneService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Log
@RestController
@RequestMapping("mile")
@AllArgsConstructor
public class MileController {

    private MilestoneService milestoneService;

    @PostMapping("create")
    public void createMile(@RequestBody MilestoneDTO milestoneDTO){
        log.info("member create() : "+milestoneDTO);
        milestoneService.createMile(milestoneDTO);
    }

    /*
     at Talend API Tester
     method : post
     http://localhost:8000/mile/create
     {
    	"milestone_title": "마일스톤테스트",
    	"milestone_content": "입니다요",
    	"milestone_startdate" : 20210910,
    	"milestone_duedate" : 20210914,
    	"milestone_enddate" : 20210912,
    	"projmember_seq": "1",
    	"project_seq": "1"}
     Response 200 코드 확인 완료
     */

    @GetMapping("msList/{proSeq}")
    public List<MilestoneDTO> msList(@PathVariable long proSeq){
        List<MilestoneDTO> list = milestoneService.msListBySeq(proSeq);
        log.info("list" + list);
        return list;
    }

    //http://localhost:8000/mile/msList/1 호출 성공


    @GetMapping("msListDesc/{mileSeq}")
    public List<MilestoneDTO> msListDesc(@PathVariable long mileSeq){
        List<MilestoneDTO> listBy = milestoneService.selectByMsSeq(mileSeq);
        log.info("listBy" + listBy);
        return listBy;
    }
    //http://localhost:8000/mile/msListDesc/1 호출 성공

    @GetMapping(value="proMname/{prjMSeq}")
    public String proMnameByMseq(@PathVariable long prjMSeq){
        String pMname = milestoneService.projMnameByMseq(prjMSeq);
        log.info("pMname" + pMname);
        return  pMname;
    }
    //http://localhost:8000/mile/proMname/1 호출 성공

    @DeleteMapping("delete/{mileSeq}")
    public void delMile(@PathVariable long mileSeq){
        milestoneService.delMile(mileSeq);
    }

    //http://localhost:8000/mile/delete/11

    @PutMapping("upStatus/{mileSeq}")
    public void upStatus (@PathVariable long mileSeq , @RequestBody MilestoneDTO milestoneDTO){
        log.info("마일스톤번호"+mileSeq);
        log.info("miledto"+milestoneDTO);
        milestoneService.upStatus(mileSeq, milestoneDTO);
    }

    //http://localhost:8000/mile/upStatus/7 호출 성공


}

