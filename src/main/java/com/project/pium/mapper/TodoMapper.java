package com.project.pium.mapper;

import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TodoDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
@Repository
public interface TodoMapper {

    /*조회*/
    List<TodoDTO>todoBySeq(long seq);
    List<TodoDTO>progressBySeq(long seq);
    List<TodoDTO>doneBySeq(long seq);

    /*갯수카운트*/
    Long countTodoStatus(long seq);
    Long countProgressStatus(long seq);
    Long countDoneStatus(long seq);
    /*선택지*/
    List<TaskDTO> showTaskByProjSeq(long seq);


    void insertNote(TodoDTO todo); // 메모 생성

    void updateNote(TodoDTO todo); // 메모 수정
    void updateNoteStatus(@RequestParam("todo_status")String todoStatus, @RequestParam("todo_seq")long todo_seq); // 메모 상태이동
    void deleteNote(long todo_seq); // 메모 삭제


}
