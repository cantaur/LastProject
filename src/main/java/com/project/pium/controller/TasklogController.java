package com.project.pium.controller;


import com.project.pium.domain.TasklogDTO;
import com.project.pium.service.TasklogService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ResponseBody
@RestController
@AllArgsConstructor
@RequestMapping("tasklog")
public class TasklogController {
    private TasklogService tasklogService;

    @GetMapping("tasklogList/{task_seq}")
    public List<TasklogDTO> tasklogList(@PathVariable("task_seq") long task_seq){
        List<TasklogDTO> list = tasklogService.tasklogListS(task_seq);
        return list;
    /*at Talend API Tester
      method : GET
      url : http://127.0.0.1:8000/tasklog/tasklogList/1
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertCreate")
    public void insertCreate(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertCreateS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertCreate
        {
          "tasklog_type":"업무가 생성되었습니다.",
          "task_seq":1,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertTitleUpdate")
    public void insertTitleUpdate(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertTitleUpdateS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertTitleUpdate
        {
          "tasklog_type":"업무 제목이 변경되었습니다.",
          "task_seq":2,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertContentUpdate")
    public void insertContentUpdate(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertContentUpdateS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertContentUpdate
        {
          "tasklog_type":"업무 내용이 변경되었습니다.",
          "task_seq":2,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertDateUpdate")
    public void insertDateUpdate(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertDateUpdateS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertDateUpdate
        {
          "tasklog_type":"업무 날짜가 변경되었습니다.",
          "task_seq":2,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertPriorityUpdate")
    public void insertPriorityUpdate(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertPriorityUpdateS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertPriorityUpdate
        {
          "tasklog_type":"업무 중요도가 변경되었습니다.",
          "task_seq":2,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertLabelUpdate")
    public void insertLabelUpdate(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertLabelUpdateS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertLabelUpdate
        {
          "tasklog_type":"업무 라벨이 변경되었습니다.",
          "task_seq":2,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertDelete")
    public void insertDelete(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertDeleteS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertDelete
        {
          "tasklog_type":"업무가 삭제되었습니다.",
          "task_seq":3,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertRestore")
    public void insertRestore(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertRestoreS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertRestore
        {
          "tasklog_type":"업무가 복구되었습니다.",
          "task_seq":3,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertEnd")
    public void insertEnd(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertEndS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertEnd
        {
          "tasklog_type":"업무가 종료되었습니다.",
          "task_seq":3,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertFileUpload")
    public void insertFileUpload(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertFileUploadS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertFileUpload
        {
          "tasklog_type":"업무 파일이 업로드되었습니다.",
          "task_seq":3,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }
    @PostMapping("insertFileDelete")
    public void insertFileDelete(@RequestBody TasklogDTO tasklogDTO){
        tasklogService.insertFileDeleteS(tasklogDTO);
    /*at Talend API Tester
      method : POST
      url : http://127.0.0.1:8000/tasklog/insertFileDelete
        {
          "tasklog_type":"업무 파일이 삭제되었습니다.",
          "task_seq":3,
          "projmember_seq":1
        }
      Response 200 코드 확인 완료
    */
    }

}
