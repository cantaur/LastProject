package com.project.pium.service;

import com.project.pium.domain.TodoDTO;

import java.util.List;

public interface TodoService {
    List<TodoDTO>selectNoteToDoS(); // 메모 상태 10
    List<TodoDTO>selectNoteProgS(); // 메모 상태 20
    List<TodoDTO>selectNoteDoneS(); // 메모 상태 30
    void insertNoteS(TodoDTO todo); // 메모 생성
    void updateNoteS(TodoDTO todd); // 메모 수정
    void updateNoteStatusS(TodoDTO todo); // 메모 상태이동
    void deleteNoteS(long seq); // 메모 삭제

//    List<TodoDTO>selectAssignS(); // 배정된 업무 조회
//    List<TodoDTO>selectWorkS(); // 진행중인 업무
//    List<TodoDTO>selectDoneS(); // 완료된 업무
}
