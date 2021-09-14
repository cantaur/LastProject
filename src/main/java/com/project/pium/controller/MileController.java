package com.project.pium.controller;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.service.MilestoneService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Log
@RestController
@RequestMapping("mile")
@AllArgsConstructor
public class MileController {

    private MilestoneService milestoneService;

    @PostMapping("insert")
    public void insertUser(@RequestBody MilestoneDTO milestoneDTO){
        log.info("member create() : "+milestoneDTO);
        milestoneService.insertTest(milestoneDTO);
    }

    /*
     at Talend API Tester
     method : post
     http://localhost:8000/mile/insert
     {
    	"milestone_title": "마일스톤테스트",
    	"milestone_content": "입니다요",
    	"milestone_status": "0",
    	"milestone_isdelete": "0",
    	"projmember_seq": "1",
    	"project_seq": "1"}
     Response 200 코드 확인 완료
     */

}
