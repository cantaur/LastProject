package com.project.pium.service;

import com.project.pium.domain.TaskDTO;
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
    public TodoDTO selectByTodoS(long seq){return  mapper.selectByTodo(seq);}
    @Override
    public List<TodoDTO> selectBySeqS(long seq) {return mapper.selectBySeq(seq);}
    @Override
    public List<TodoDTO>progressBySeqS(long seq){
        return mapper.progressBySeq(seq);
    }
    @Override
    public List<TodoDTO>doneBySeqS(long seq){
        return mapper.doneBySeq(seq);
    }
    @Override
    public Long countDoneStatusS(long seq) {
        return mapper.countDoneStatus(seq);
    }
    @Override
    public Long countTodoStatusS(long seq){return mapper.countTodoStatus(seq);}
    @Override
    public Long countProgressStatusS(long seq){
        return mapper.countProgressStatus(seq);
    }
    @Override
    public List<String> showTaskS(long seq){
        return mapper.showTask(seq);
    }
    @Override
    public List<TaskDTO> showTaskNSeqS(long seq){return mapper.showTaskNSeq(seq);}
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
    public void updateNoteS(TodoDTO todo) {
        mapper.updateNote(todo);
    }
    @Override
    public void deleteNoteS(long todo_seq) {
        mapper.deleteNote(todo_seq);
    }

    @Override
    public void insertNoteS(TodoDTO todo) {
        mapper.insertNote(todo);
    }
    @Override
    public void updateNoteStatusS(TodoDTO todo) { mapper.updateNoteStatus(todo);
    }
}
