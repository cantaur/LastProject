package com.project.pium.service;

import com.project.pium.domain.TodoDTO;
import com.project.pium.mapper.TodoMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {
    private TodoMapper mapper;

    @Override
    public List<TodoDTO> selectNoteToDoS() {
        return mapper.selectNoteToDo();
    }

    @Override
    public List<TodoDTO> selectNoteProgS() {
        return mapper.selectNoteProg();
    }

    @Override
    public List<TodoDTO> selectNoteDoneS() {
        return mapper.selectNoteDone();
    }

    @Override
    public void insertNoteS(TodoDTO todo) {
        mapper.insertNote(todo);
    }

    @Override
    public void updateNoteS(TodoDTO todo) {
        mapper.updateNote(todo);
    }

    @Override
    public void updateNoteStatusS(TodoDTO todo) { mapper.updateNoteStatus(todo);
    }

    @Override
    public void deleteNoteS(long seq) {
        mapper.deleteNote(seq);
    }
}
