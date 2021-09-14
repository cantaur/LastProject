package com.project.pium.controller;

import com.project.pium.domain.TaskDTO;
import com.project.pium.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("task")
@AllArgsConstructor
public class TaskController {
    private TaskService service;

    @PostMapping("insert")//http://localhost:8000/task/insert
    public void insertTask(@RequestBody TaskDTO task){
        log.info("#TaskController insert() : "+task);
        service.insertS(task);
    }
//{"task_title":"테스크콘트롤러테스트",
// "task_content":"테스트내용",
// "task_status":1,
// "task_isdelete":1,
// "task_startdate":null,
// "task_duedate":null,
// "milestone_seq":1
//}OK
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
    @PatchMapping("updateAll/{seq}") //http://127.0.0.1:8000/task/updateAll/1
    public void updateAll(@PathVariable long seq, @RequestBody TaskDTO task) {
        TaskDTO t = new TaskDTO(seq,task.getTask_title(),task.getTask_content(),
                task.getTask_status(),task.getTask_isdelete(), task.getTask_startdate(),
                task.getTask_duedate(), task.getTask_enddate(),task.getMilestone_seq(),
                task.getPriority_code(),task.getLabel_seq());
        log.info("#TaskDTO t: "+t);
        service.updateAllS(t);
    }
//    {"task_title":"제목",
//            "task_content":"내용",
//            "task_status":"1",
//            "task_isdelete":"1",
//            "task_startdate":null,
//            "task_duedate":null,
//            "task_enddate":null,
//            "milestone_seq":1,
//            "priority_code":"10",
//            "label_seq":"1"
//    }OK
}
