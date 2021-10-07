package com.project.pium.controller;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
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
    
    //해당 마일스톤에서 생성된 전체 업무리스트(검증X)
    @GetMapping("/ajax/task/{mileSeq}")
    public List<TaskDTO> taskListByMile(@PathVariable long mileSeq){return taskService.taskListByMile(mileSeq);}

    //업무를 클릭하였을때 나오는 업무 상세보기(검증X)
    @GetMapping("/ajax/taskView/{taskSeq}")//임시이름
    public TaskDTO showTaskByTaskseq(@PathVariable long taskSeq){return taskService.showTaskByTaskseq(taskSeq);}

    //title update
    @PostMapping("/ajax/updateTaskTitle")
    public void updateTitle(@RequestBody TaskDTO task){taskService.updateTitle(task);}

    //content update
    @PostMapping("/ajax/updateTaskCont")
    public void updateContent(@RequestBody TaskDTO task){taskService.updateContent(task);}

    //마일스톤 변경하기
    @PostMapping("/ajax/changeMile")
    public void updateMilestone(@RequestBody TaskDTO task){taskService.updateMilestone(task);}

    //업무 상태 마감으로 변경
    @PostMapping("/ajax/closeTask")
    public void updateStatusFinish(@RequestParam long taskSeq){taskService.updateStatusFinish(taskSeq);}

    //업무 다시 활성화 시키기
    @PostMapping("/ajax/openTask")
    public void updateStatusDefault(@RequestParam long taskSeq){taskService.updateStatusDefault(taskSeq);}

    //업무 삭제상태로 변경
    @PostMapping("/ajax/deleteTask")
    public void updateIsdelete(@RequestParam long taskSeq){taskService.updateIsdelete(taskSeq);}

    //업무에 멤버 배정
    @PostMapping("/ajax/addMember")
    public void createTaskmember(@RequestBody TaskmemberDTO taskmember){
        log.info("#TaskController createTaskmember() : "+taskmember);
        taskService.insertTaskMember(taskmember);
    }
    //업무에 중요도 셋팅하기
    @PostMapping("/ajax/updatePriority")
    public void updatePriority(@RequestBody TaskDTO task){taskService.updatePriority(task);}

    //날짜 업데이트
    @PostMapping("/ajax/updateTaskDate")
    public void updateDate(@RequestBody TaskDTO task){taskService.updateDate(task);}
}
