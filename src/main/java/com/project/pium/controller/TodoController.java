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



    @PostMapping("/ajax/createTodo")
    public String insertNote(@RequestBody Map<String, Object> params){
        String todo_name = String.valueOf(params.get("todo_name"));
        String todo_content = String.valueOf(params.get("todo_content"));
        String todo_status = String.valueOf(params.get("todo_status"));
        String task_seq = String.valueOf(params.get("task_seq"));
        Long projmember_seq = Long.valueOf(String.valueOf(params.get("projmember_seq")));

        
        TodoDTO todoDTO = new TodoDTO();
        todoDTO.setTodo_name(todo_name);
        todoDTO.setTodo_content(todo_content);
        todoDTO.setTodo_status(todo_status);
        todoDTO.setProjmember_seq(projmember_seq);
        if(task_seq != null){
          todoDTO.setTask_seq(Long.valueOf(task_seq));
        }

        todoService.insertNoteS(todoDTO);

        return "success";
    }

    //task 생성 시 드랍박스 안에 보여질 task 제목 등 정보 불러오기
    @GetMapping("/ajax/showTaskinTodo/{projectSeq}")
    public List<TaskDTO> showTaskinTodo(@PathVariable long projectSeq){
        List<TaskDTO> list = todoService.showTaskByProjSeqS(projectSeq);
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

    //메모 삭제하기
    @PostMapping("/ajax/deleteTodo")
    public void deleteNote(@RequestBody Map<String, Integer> param){
        Long todoSeq = Long.valueOf(param.get("todo_seq"));
        todoService.deleteNoteS(todoSeq);
    }

    //메모 수정하기
    @PostMapping("/ajax/updateTodo")
    public void updateNote(@RequestBody TodoDTO todo){
        log.info("#updateTodo: " + todo);
        todoService.updateNoteS(todo);
    }


    //메모의 상태 변경하기
    @PostMapping("/ajax/changeTodoStatus")
    public void changeTodoStatus(@RequestBody Map<String, Integer> param){
        String todoStatus = String.valueOf(param.get("todo_status"));
        Long todoSeq = Long.valueOf(param.get("todo_seq"));
        log.info("메모상태변경하기 : "+todoStatus+todoSeq);


    }





















}
