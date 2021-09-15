package com.project.pium.controller;

import com.project.pium.domain.TodoDTO;
import com.project.pium.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("todo")
@AllArgsConstructor
public class TodoController {
    private final TodoService service;

    @GetMapping("select")
    public List<TodoDTO> selectNoteToDo(){
        List<TodoDTO> list = service.selectNoteToDoS();
        log.info("TodoSelect status_Todo: " + list);
        return list;
    }
    @PostMapping("insert")
    public void insertNote(@RequestBody TodoDTO todo){
        log.info("TodoInsert(): "+todo);
        service.insertNoteS(todo);
    }
    @PatchMapping("updateNote/{seq}")
    public void updateNote(@RequestBody TodoDTO todo){
        log.info("updateNote: " + todo);
        service.updateNoteS(todo);
    }
    @PatchMapping("updateStatus/{seq}")
    public void updateNoteStatus(@RequestBody TodoDTO todo){
        log.info("updateStatus: "+todo);

        service.updateNoteStatusS(todo);
    }
    @DeleteMapping("deleteNote/{seq}")
    public void deleteNote(@PathVariable long seq){
        service.deleteNoteS(seq);
    }

}
