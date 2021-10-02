package com.project.pium.controller;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TodoDTO;
import com.project.pium.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class TodoController {
    private TodoService todoService;


    //간단한 메모 입력하기
    @PostMapping("/ajax/createTodo")
    public void insertNote(@RequestBody TodoDTO todoDTO){
        log.info("TodoInsert(): "+todoDTO);
        todoService.insertNoteS(todoDTO);
    }

    //task 생성 시 드랍박스 안에 보여질 task 제목 등 정보 불러오기
    @GetMapping("/ajax/showTasknSeq/{projMemberSeq}")
    public List<TaskDTO> showTasknSeq(@PathVariable long projMemberSeq){
        List<TaskDTO> list = todoService.showTaskNSeqS(projMemberSeq);
        return list;
    }

    //내가 생성한 to do list. 상태값별로 나누어서
    @GetMapping("/ajax/mytodo/{projMemberSeq}")
    public ArrayList<Object> todoListProjmem(@PathVariable long projMemberSeq){
        ArrayList<Object> todolistInfo = new ArrayList<>();
        LinkedHashMap<String,Object> tempTodo = new LinkedHashMap<>();

        List<TodoDTO> todoList = todoService.todoBySeqS(projMemberSeq);
        List<TodoDTO> progressList = todoService.progressBySeqS(projMemberSeq);
        List<TodoDTO> doneList = todoService.doneBySeqS(projMemberSeq);

        tempTodo.put("todoList", todoList);
        tempTodo.put("progressList", progressList);
        tempTodo.put("doneList", doneList);

        todolistInfo.add(tempTodo);

        log.info("#내가 생성한 to do list"+todolistInfo);
        return todolistInfo;
    }

    
    

    //내가 생성한 to do list 불러오기. to do 상태
    //projMemberSeq로 불러 올 수 있는지 봐야함
//    @GetMapping("/ajax/mytodo/{projMemberSeq}")
//    public List<TodoDTO> selectBySeq(@PathVariable long projMemberSeq){
//
//        List<TodoDTO> list = todoService.selectBySeqS(projMemberSeq);
//        log.info("#내가 생성한 to do list"+list);
//        return list;
//    }

    //in progress 상태
//    @GetMapping("/ajax/myprogress/{projMemberSeq}")
//    public List<TodoDTO> progressBySeq(@PathVariable long projMemberSeq){
//        List<TodoDTO> list = todoService.progressBySeqS(projMemberSeq);
//        return list;
//    }

    //done 상태
//    @GetMapping("/ajax/mydone/{projMemberSeq}")
//    public List<TodoDTO> doneBySeq(@PathVariable long projMemberSeq){
//        List<TodoDTO> list = todoService.doneBySeqS(projMemberSeq);
//        return list;
//    }




    //각각 상태에 저장된 note들의 갯수 표현
    @GetMapping("/ajax/countTodo/{projMemberSeq}")
    public Long countTodo(@PathVariable long projMemberSeq){
        long cnt = todoService.countTodoStatusS(projMemberSeq);
        return cnt;
    }
    @GetMapping("/ajax/countProgress/{projMemberSeq}")
    public Long countProgress(@PathVariable long projMemberSeq){
        long cnt = todoService.countProgressStatusS(projMemberSeq);
        return cnt;
    }
    @GetMapping("/ajax/countDone/{projMemberSeq}")
    public Long countDone(@PathVariable long projMemberSeq) {
        long cnt = todoService.countDoneStatusS(projMemberSeq);
        return cnt;
    }




    @GetMapping("/ajax/todoData")
    public TodoDTO todoData(@RequestParam String seq){
        try {
            seq.trim();
            long lSeq = Long.parseLong(seq);
            TodoDTO todo =todoService.selectByTodoS(lSeq);
            return todo;
        }catch(Exception e){
            log.info("#todoData e: "+e);
        }
        return null;
    }
    @PostMapping("/ajax/updateTodo")
    public void updateNote(@RequestBody TodoDTO todo){
        log.info("#updateTodo: " + todo);
        todoService.updateNoteS(todo);
    }
    @ResponseBody
    @PostMapping("/ajax/deleteTodo")
    public void deleteNote(@RequestBody Map<String,Integer> param){
        long lseq = Long.valueOf(param.get("seq"));
        todoService.deleteNoteS(lseq);
    }

//    @PatchMapping("updateStatus/{seq}")
//    public void updateNoteStatus(@RequestBody TodoDTO todo){
//        log.info("updateStatus: "+todo);
//
//        service.updateNoteStatusS(todo);
//    }
}
