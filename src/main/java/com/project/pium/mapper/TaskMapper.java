package com.project.pium.mapper;

import com.project.pium.domain.TaskDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TaskMapper {
    //새 업무 생성하기
    void createTask(TaskDTO task);
    //해당 프로젝트에서 생성된 업무 리스트
    List<TaskDTO> taskList(long projSeq);
    //해당 마일스톤에서 생성된 업무 갯수
    int countTask(long mileSeq);
    //해당 마일스톤에서 완료된 업무의 갯수
    int countClosedTask(long mileSeq);









    List<TaskDTO> selectAll(); //전체조회
    List<TaskDTO> selectByMilestone(long seq); //마일스톤으로 조회
    List<TaskDTO> selectByStatus(String status); //상태로 조회
    List<TaskDTO> selectByPriority(String priority); //중요도로 조회

    void delete(long seq);
    void updateForStatus(long seq);
    void updateForStatusZero(long seq);
    void updateAll(TaskDTO task);
}
