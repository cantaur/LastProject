package com.project.pium.controller;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskcommentDTO;
import com.project.pium.service.TaskcommentService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("comment")
@AllArgsConstructor
public class TaskcommentController {
    private TaskcommentService service;

    @GetMapping("select")//전체글
    public List<TaskcommentDTO> selectAll(){
        List<TaskcommentDTO> list = service.selectAllS();
        return list;
    }//http://127.0.0.1:8000/comment/select OK
    @GetMapping("select/{seq}")//업무에 따라 분류
    public List<TaskcommentDTO> selectBySeq(@PathVariable long seq){
        List<TaskcommentDTO> list = service.selectBySeqS(seq);
        return list;
    }//http://127.0.0.1:8000/comment/select/1 OK
    @PostMapping("insert")//작성 http://localhost:8000/comment/insert
    public void insertComment(@RequestBody TaskcommentDTO task){
        log.info("#Comment insert()"+task);
        service.insertS(task);
    }
//    POST /comment/insert HTTP/1.1
//    {"comment_content":"코멘트테스트",
//            "task_seq":1,
//            "projmember_seq":1
//    }
    @PatchMapping("delete/{seq}")//삭제상태로 변경 http://127.0.0.1:8000/comment/delete/10 OK
    public void delete(@PathVariable long seq) {
        service.deleteS(seq);
    }
    @PatchMapping("update")//내용 수정 http://127.0.0.1:8000/comment/update/
    public void update(@RequestBody TaskcommentDTO task){
        service.updateS(task);
    }
//    {"comment_seq":1,
//    "comment_content":"코멘트테스트"
//    }
}
