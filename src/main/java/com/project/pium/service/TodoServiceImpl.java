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
        return null;
    }

    @Override
    public List<TodoDTO> selectNoteProgS() {
        return null;
    }

    @Override
    public List<TodoDTO> selectNoteDoneS() {
        return null;
    }

    @Override
    public void insertNoteS(TodoDTO todo) {

    }

    @Override
    public void updateNoteS(long seq, TodoDTO todo) {
        mapper.updateNote(seq,todo);
    }

    @Override
    public void updateNoteStatusS(long seq, TodoDTO todo) {
        mapper.updateNoteStatus(seq);
    }

    @Override
    public void deleteNoteS(long seq) {
        mapper.deleteNote(seq);
    }
}
