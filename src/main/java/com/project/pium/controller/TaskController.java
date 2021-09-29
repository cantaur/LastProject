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
    private TaskService taskService;
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
    public void createTask(@RequestBody TaskDTO taskDTO){
        log.info("#TaskController insert() : "+taskDTO);
        taskService.createTask(taskDTO);
    }

    //해당 프로젝트에서 생성된 모든 업무 리스트
    @GetMapping("/ajax/{projSeq}/tasklist")
    public List<TaskDTO> taskList(@PathVariable long projSeq){
        return taskService.taskList(projSeq);
    }
    
    //해당 마일스톤에서 생성된 전체 업무리스트
    
    //업무를 클릭하였을때 나오는 업무 상세보기
    
    //업무에 멤버 배정

    //title update
    
    //content update
    
    //날짜 업데이트
    
    //업무에 중요도 셋팅하기
    
    //마일스톤 변경하기
    
    //업무 상태 마감으로 변경
    
    //업무 다시 활성화 시키기
    
    //업무 삭제상태로 변경



































    @GetMapping("select") //모든업무 OK
    public List<TaskDTO> selectAll(){
        List<TaskDTO> list = taskService.selectAllS();
        return list;
    }//http://127.0.0.1:8000/task/select

    @GetMapping("select/{seq}") //마일스톤 필터링 OK
    public List<TaskDTO> selectByMilestone(@PathVariable long seq){
        List<TaskDTO> list = taskService.selectByMilestoneS(seq);
        return list;
    }//http://127.0.0.1:8000/task/select/1

    @GetMapping(value="select", params = {"status"}) //상태 필터링 OK
    public List<TaskDTO> selectByStatus(@RequestParam("status") String status){
        List<TaskDTO> list = taskService.selectByStatusS(status);
        return list;
    }//http://127.0.0.1:8000/task/select?status=0

    @GetMapping(value="select", params = {"priority"}) //중요도 필터링 OK
    public List<TaskDTO> selectByPriority(@RequestParam("priority") String priority){
        List<TaskDTO> list = taskService.selectByPriorityS(priority);
        return list;
    }//http://127.0.0.1:8000/task/select?priority=40

    @PatchMapping("delete/{seq}") //http://127.0.0.1:8000/task/delete/10
    public void delete(@PathVariable long seq) {
        taskService.deleteS(seq);
    }//OK
    @PatchMapping("update/{seq}") //http://127.0.0.1:8000/task/update/11
    public void updateForStatus(@PathVariable long seq) {
        taskService.updateForStatusS(seq);
    }//1로 만듦
//    @PatchMapping("update/{seq}") //http://127.0.0.1:8000/task/update/11
//    public void updateForStatusZero(@PathVariable long seq) {
//        service.updateForStatusZeroS(seq);
//    }//0으로 만듦
    @PatchMapping("updateAll") //http://127.0.0.1:8000/task/updateAll/1
    public void updateAll(@RequestBody TaskDTO task) {
        taskService.updateAllS(task);
    }
//    {"task_seq":"1",
//            "task_title":"제목수정",
//            "task_content":"내용수정",
//            "milestone_seq":1,
//            "label_seq":1
//    }
//제약조건문제로 milestoneSeq, labelSeq 값이 있어야만 함...
}
