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
    private TodoMapper todoMapper;



    @Override
    public List<TodoDTO> todoBySeqS(long seq) {return todoMapper.todoBySeq(seq);}
    @Override
    public List<TodoDTO>progressBySeqS(long seq){
        return todoMapper.progressBySeq(seq);
    }
    @Override
    public List<TodoDTO>doneBySeqS(long seq){
        return todoMapper.doneBySeq(seq);
    }



    @Override
    public Long countDoneStatusS(long seq) {
        return todoMapper.countDoneStatus(seq);
    }
    @Override
    public Long countTodoStatusS(long seq){return todoMapper.countTodoStatus(seq);}
    @Override
    public Long countProgressStatusS(long seq){
        return todoMapper.countProgressStatus(seq);
    }



    @Override
    public List<TaskDTO> showTaskByProjSeqS(long seq){return todoMapper.showTaskByProjSeq(seq);}


    @Override
    public void insertNoteS(TodoDTO todo) {
        todoMapper.insertNote(todo);
    }

    @Override
    public void noTaskInsert(TodoDTO todo) {
        todoMapper.noTaskInsert(todo);
    }

    @Override
    public void updateNoteS(TodoDTO todo) {
        todoMapper.updateNote(todo);
    }
    @Override
    public void deleteNoteS(long todo_seq) {
        todoMapper.deleteNote(todo_seq);
    }
    @Override
    public void updateNoteStatusS(TodoDTO todo) { todoMapper.updateNoteStatus(todo);
    }
}
