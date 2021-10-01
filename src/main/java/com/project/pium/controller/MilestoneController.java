package com.project.pium.controller;

import com.project.pium.domain.MilestoneDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.service.MemberService;
import com.project.pium.service.MilestoneService;
import com.project.pium.service.ProjectmemberService;
import com.project.pium.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class MilestoneController {

    private MilestoneService milestoneService;
    private MemberService memberService;
    private ProjectmemberService projectmemberService;
    private TaskService taskService;

    //현재 로그인한 유저의 세션값 얻어오는 로직 모듈화
    public String currentUserName(Principal principal){
        if(principal ==null){
            return "false";
        }else{
            String sessionEmail = principal.getName();
            return sessionEmail;
        }
    }

    //마일스톤 생성하기
    @PostMapping("/ajax/createMileStone")
    public String createMile(@RequestBody MilestoneDTO milestoneDTO, Principal principal){
        log.info("#milestoneDTO 생성: "+milestoneDTO);
        long projSeq= milestoneDTO.getProject_seq();

        //1. 접속한 유저 이메일로 memberSeq 찾음
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);

        //2. projectSeq와 memberSeq로 project_member seq 찾음
        long projMemberSeq = projectmemberService.findProjMemberSeq(projSeq,sessionSeq);
        milestoneDTO.setProjmember_seq(projMemberSeq);
        milestoneService.createMile(milestoneDTO);
        return "success";
    }
    

    //해당 프로젝트에서 생성된 전체 마일스톤 리스트 보여주기
    //업무 갯수 뽑아오는 로직 구현중
    @GetMapping("/ajax/{projSeq}/milestonelist")
    public List<MilestoneDTO> msList(@PathVariable long projSeq){
        MilestoneDTO milestoneDTO = null;
        LinkedHashMap<String, Object> mileInfo = new LinkedHashMap<>();
        List<MilestoneDTO> milestoneList = milestoneService.msListBySeq(projSeq);
        for (int i=0; i<milestoneList.size(); i++) {
            milestoneDTO = milestoneList.get(i);
            long mileSeq = milestoneDTO.getMilestone_seq();
            int countTask = taskService.countTask(mileSeq);
            int closedMile = taskService.countClosedTask(mileSeq);
            mileInfo.put("countTask",countTask);
            mileInfo.put("closedMile",closedMile);
            mileInfo.put("milestone_seq",mileSeq);
            mileInfo.put("milestone_title",milestoneDTO.getMilestone_title());
            mileInfo.put("milestone_content",milestoneDTO.getMilestone_content());
            mileInfo.put("milestone_status",milestoneDTO.getMilestone_status());
            mileInfo.put("milestone_isdelete",milestoneDTO.getMilestone_isdelete());
            mileInfo.put("milestone_startdate",milestoneDTO.getMilestone_startdate());
            mileInfo.put("milestone_duedate",milestoneDTO.getMilestone_duedate());
            mileInfo.put("milestone_enddate",milestoneDTO.getMilestone_enddate());
            mileInfo.put("projmember_seq",milestoneDTO.getProjmember_seq());
            mileInfo.put("project_seq",milestoneDTO.getProject_seq());
            log.info("어떻게 나오는지 궁금해!"+mileInfo);
        }





        return milestoneList;
    }
    
    //마일스톤 눌러서 들어갔을 때 나오는 마일스톤 상세정보 보여주기
    @GetMapping("/ajax/milestone/{mileSeq}")
    public MilestoneDTO msListDesc(@PathVariable long mileSeq){
        LinkedHashMap<String, Object> mileDetail = new LinkedHashMap<>();
        MilestoneDTO milestoneDTO = milestoneService.findMilestoneByMileSeq(mileSeq);
        int countTask = taskService.countTask(mileSeq);
        int closedMile = taskService.countClosedTask(mileSeq);
        mileDetail.put("countTask",countTask);
        mileDetail.put("closedMile",closedMile);
        mileDetail.put("milestone_title",milestoneDTO.getMilestone_title());
        mileDetail.put("milestone_content",milestoneDTO.getMilestone_content());
        mileDetail.put("milestone_status",milestoneDTO.getMilestone_status());
        mileDetail.put("milestone_startdate",milestoneDTO.getMilestone_startdate());
        mileDetail.put("milestone_duedate",milestoneDTO.getMilestone_duedate());
        mileDetail.put("milestone_enddate",milestoneDTO.getMilestone_enddate());
        mileDetail.put("projmember_seq",milestoneDTO.getProjmember_seq());


        log.info("어떻게 나오는지 궁금해!"+mileDetail);
        return milestoneDTO;
    }

    //마일스톤 수정(제목,설명,달력)
    @PostMapping("/ajax/updateMileStone")
    public void updateMileStone(@RequestBody MilestoneDTO milestoneDTO, Principal principal){
        log.info("#milestoneDTO 수정: "+milestoneDTO);
        milestoneService.updateMilestone(milestoneDTO);
    }

    //마일스톤 캘린더 비우기(get으로 milestone_seq 주면 date에 null 셋팅)
    @GetMapping("/ajax/setDateEmpty/{mileSeq}")
    public void setDateEmpty(@PathVariable long mileSeq){
        milestoneService.setDateEmpty(mileSeq);
    }




    // 마일스톤 완료상태로 전환
    @ResponseBody
    @PostMapping("/ajax/closeMileStone")
    public void closeMileStone(@RequestBody Map<String,Integer> param){
        Long mileSeq= Long.valueOf(param.get("milestone_seq"));
        milestoneService.closeMilestone(mileSeq);
    }

    // 마일스톤 오픈상태로 전환
    @ResponseBody
    @PostMapping("/ajax/openMileStone")
    public void openMileStone(@RequestBody Map<String,Integer> param){
        Long mileSeq= Long.valueOf(param.get("milestone_seq"));
        milestoneService.openMilestone(mileSeq);
    }


    // 마일스톤 삭제상태로 전환
    @ResponseBody
    @PostMapping("/ajax/deleteMileStone")
    public void deleteMileStone(@RequestBody Map<String,Integer> param){
        Long mileSeq= Long.valueOf(param.get("milestone_seq"));
        milestoneService.delMilestone(mileSeq);
    }
    
    
    //마일스톤 상세페이지>업무 리스트
    @GetMapping("/ajax/milestone/{mileSeq}/tasks")
    public List<TaskDTO> taskInMilestone(@PathVariable long mileSeq){
        List<TaskDTO> tasks = taskService.taskListByMile(mileSeq);
        return tasks;
    }



























}

