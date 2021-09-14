package com.project.pium.controller;

import com.project.pium.domain.TaskDTO;
import com.project.pium.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@RequestMapping("task")
@AllArgsConstructor
public class TaskController {
    private TaskService service;

    @PostMapping("insert")
    public void insertTask(@RequestBody TaskDTO task){
//        log.info("#AddressRestController create() address: "+address);
//        service.insertS(address);
        log.info("#TaskController insert() : "+task);
        service.insertS(task);
    }
//http://localhost:8000/task/insert
//{"task_title":"테스크콘트롤러테스트",
// "task_content":"테스트내용",
// "task_status":1,
// "task_isdelete":1,
// "task_startdate":null,
// "task_duedate":null,
// "milestone_seq":1
//}
}
