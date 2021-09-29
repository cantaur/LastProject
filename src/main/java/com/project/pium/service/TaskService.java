package com.project.pium.service;

import com.project.pium.domain.TaskDTO;

import java.util.List;

public interface TaskService {
    //새 업무 생성하기
    void createTask(TaskDTO task);
    //해당 프로젝트에서 생성된 업무 리스트
    List<TaskDTO> taskList(long projSeq);
    //해당 마일스톤에서 생성된 업무 갯수
    int countTask(long mileSeq);
    //해당 마일스톤에서 완료된 업무의 갯수
    int countClosedTask(long mileSeq);



    List<TaskDTO> selectAllS(); //전체조회
    List<TaskDTO> selectByMilestoneS(long seq); //마일스톤으로 조회
    List<TaskDTO> selectByStatusS(String status); //상태로 조회
    List<TaskDTO> selectByPriorityS(String priority); //중요도로 조회

    void deleteS(long seq);
    void updateForStatusS(long seq);
    void updateForStatusZeroS(long seq);
    void updateAllS(TaskDTO task);
}
