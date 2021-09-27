package com.project.pium.controller;


import com.project.pium.domain.TodoDTO;
import com.project.pium.service.MemberService;
import com.project.pium.service.TaskService;
import com.project.pium.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@Log
@RestController
//@RequestMapping("todo")
@AllArgsConstructor
@ResponseBody
public class TodoController {
    private ProjectController projcontroller;
    private MemberService memberservice;
    private TaskService taskservice;
    private TodoService service;

    @ResponseBody
    @GetMapping("/ajax/mytodo")
    public List<TodoDTO> selectBySeq(Principal principal){
        String email= projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        List<TodoDTO> list = service.selectBySeqS(seq);
        return list;
    }
    @GetMapping("/ajax/myprogress")
    public List<TodoDTO> progressBySeq(Principal principal){
        String email= projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        List<TodoDTO> list = service.progressBySeqS(seq);
        return list;
    }
    @GetMapping("/ajax/mydone")
    public List<TodoDTO> doneBySeq(Principal principal){
        String email= projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        List<TodoDTO> list = service.doneBySeqS(seq);
        return list;
    }
    @GetMapping("/ajax/showTask")
    public List<String> showTask(Principal principal){
        String email= projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        List<String> list = service.showTaskS(seq);
        return list;
    }
    @GetMapping("/ajax/countTodo")
    public Long countTodo(Principal principal){
        String email = projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        long cnt = service.countTodoStatusS(seq);
        return cnt;
    }
    @GetMapping("/ajax/countProgress")
    public Long countProgress(Principal principal){
        String email = projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        long cnt = service.countProgressStatusS(seq);
        return cnt;
    }
    @GetMapping("/ajax/countDone")
    public Long countDone(Principal principal) {
        String email = projcontroller.currentUserName(principal);
        long seq = memberservice.findUserNo(email);
        long cnt = service.countDoneStatusS(seq);
        return cnt;
    }
    @GetMapping("/ajax/todoData/")
    public TodoDTO todoData(@RequestParam String seq){
        try {
            seq.trim();
            long lSeq = Long.parseLong(seq);
            TodoDTO todo =service.selectByTodoS(lSeq);
            return todo;
        }catch(Exception e){
            log.info("#todoData e: "+e);
        }
        return null;
    }
//    @ResponseBody
//    @GetMapping("/todo/deleteTodo")
//    public void deleteNote(@RequestBody long param){
//        service.deleteNoteS(param);
//    }//405 error

//    @GetMapping("ajax/showTodo")
//    public TodoDTO showTodo(){
//        return null;
//    }
//    @ResponseBody
//    @PostMapping("/todo/createTodo")
//    public void insertNote(@RequestBody TodoDTO todo){
//        log.info("TodoInsert(): "+todo);
//        service.insertNoteS(todo);
//    }

//    @PatchMapping("updateNote/{seq}")
//    public void updateNote(@RequestBody TodoDTO todo){
//        log.info("updateNote: " + todo);
//        service.updateNoteS(todo);
//    }
//    @PatchMapping("updateStatus/{seq}")
//    public void updateNoteStatus(@RequestBody TodoDTO todo){
//        log.info("updateStatus: "+todo);
//
//        service.updateNoteStatusS(todo);
//    }
}
