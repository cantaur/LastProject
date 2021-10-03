package com.project.pium.service;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TodoDTO;

import java.util.List;

public interface TodoService {

    /*조회*/
    List<TodoDTO>todoBySeqS(long seq);
    List<TodoDTO>progressBySeqS(long seq);
    List<TodoDTO>doneBySeqS(long seq);

    /*갯수카운트*/
    Long countTodoStatusS(long seq);
    Long countProgressStatusS(long seq);
    Long countDoneStatusS(long seq);
    /*선택지*/
    List<TaskDTO> showTaskByProjSeqS(long seq);

    void insertNoteS(TodoDTO todo); // 메모 생성

    void updateNoteS(TodoDTO todd); // 메모 수정
    void updateNoteStatusS(String todoStatus, long todoSeq); // 메모 상태이동
    void deleteNoteS(long todo_seq); // 메모 삭제


}
