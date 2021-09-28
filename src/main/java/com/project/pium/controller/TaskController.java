package com.project.pium.controller;

import com.project.pium.domain.TaskDTO;
import com.project.pium.service.MemberService;
import com.project.pium.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class TaskController {
    private TaskService service;
    private MemberService memberService;

    //현재 로그인한 유저의 세션값 얻어오는 로직 모듈화
    public String currentUserName(Principal principal){
        if(principal ==null){
            return "false";
        }else{
            String sessionEmail = principal.getName();
            return sessionEmail;
        }
    }

    //새 업무 생성
    @PostMapping("/ajax/createTask")
    public void createTask(@RequestBody TaskDTO taskDTO, Principal principal){
        log.info("#TaskController insert() : "+taskDTO);
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);

        //



        service.insertS(taskDTO);
    }





























    @GetMapping("select") //모든업무 OK
    public List<TaskDTO> selectAll(){
        List<TaskDTO> list = service.selectAllS();
        return list;
    }//http://127.0.0.1:8000/task/select

    @GetMapping("select/{seq}") //마일스톤 필터링 OK
    public List<TaskDTO> selectByMilestone(@PathVariable long seq){
        List<TaskDTO> list = service.selectByMilestoneS(seq);
        return list;
    }//http://127.0.0.1:8000/task/select/1

    @GetMapping(value="select", params = {"status"}) //상태 필터링 OK
    public List<TaskDTO> selectByStatus(@RequestParam("status") String status){
        List<TaskDTO> list = service.selectByStatusS(status);
        return list;
    }//http://127.0.0.1:8000/task/select?status=0

    @GetMapping(value="select", params = {"priority"}) //중요도 필터링 OK
    public List<TaskDTO> selectByPriority(@RequestParam("priority") String priority){
        List<TaskDTO> list = service.selectByPriorityS(priority);
        return list;
    }//http://127.0.0.1:8000/task/select?priority=40

    @PatchMapping("delete/{seq}") //http://127.0.0.1:8000/task/delete/10
    public void delete(@PathVariable long seq) {
        service.deleteS(seq);
    }//OK
    @PatchMapping("update/{seq}") //http://127.0.0.1:8000/task/update/11
    public void updateForStatus(@PathVariable long seq) {
        service.updateForStatusS(seq);
    }//1로 만듦
//    @PatchMapping("update/{seq}") //http://127.0.0.1:8000/task/update/11
//    public void updateForStatusZero(@PathVariable long seq) {
//        service.updateForStatusZeroS(seq);
//    }//0으로 만듦
    @PatchMapping("updateAll") //http://127.0.0.1:8000/task/updateAll/1
    public void updateAll(@RequestBody TaskDTO task) {
        service.updateAllS(task);
    }
//    {"task_seq":"1",
//            "task_title":"제목수정",
//            "task_content":"내용수정",
//            "milestone_seq":1,
//            "label_seq":1
//    }
//제약조건문제로 milestoneSeq, labelSeq 값이 있어야만 함...
}
