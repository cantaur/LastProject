package com.project.pium.mapper;

import com.project.pium.domain.TodoDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TodoMapper {
    List<TodoDTO>selectNoteToDo(); // 메모 상태 10 조회
    List<TodoDTO>selectNoteProg(); // 메모 상태 20 조회
    List<TodoDTO>selectNoteDone(); // 메모 상태 30 조회
    void insertNote(TodoDTO todo); // 메모 생성
    void updateNote(long seq, TodoDTO todo); // 메모 수정
    void updateNoteStatus(long seq); // 메모 상태이동
    void deleteNote(long seq); // 메모 삭제
//    List<TodoDTO>selectAssign(); //배정된 업무 조회
//    List<TodoDTO>selectWork(); // 진행중인 업무
//    List<TodoDTO>selectDone(); // 완료된 업무

}
