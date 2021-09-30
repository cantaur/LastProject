package com.project.pium.service;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TodoDTO;

import java.util.List;

public interface TodoService {
    TodoDTO selectByTodoS(long seq);
    List<TodoDTO>selectBySeqS(long seq);
    List<TodoDTO>progressBySeqS(long seq);
    List<TodoDTO>doneBySeqS(long seq);
    Long countTodoStatusS(long seq);
    Long countProgressStatusS(long seq);
    Long countDoneStatusS(long seq);
    List<TaskDTO> showTaskNSeqS(long seq);
    List<TodoDTO>selectNoteToDoS(); // 메모 상태 10
    List<TodoDTO>selectNoteProgS(); // 메모 상태 20
    List<TodoDTO>selectNoteDoneS(); // 메모 상태 30
    void updateNoteS(TodoDTO todd); // 메모 수정
    void deleteNoteS(long todo_seq); // 메모 삭제

    void insertNoteS(TodoDTO todo); // 메모 생성
    void updateNoteStatusS(TodoDTO todo); // 메모 상태이동


}
