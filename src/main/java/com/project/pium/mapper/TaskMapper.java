package com.project.pium.mapper;

import com.project.pium.domain.LabelDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
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
    //해당 마일스톤에서 생성된 전체 업무리스트
    List<TaskDTO> taskListByMile(long mileSeq);
    //해당 마일스톤에서 생성된 업무리스트 중 진행중 상태인거
    List<TaskDTO> openTaskListByMile(long mileSeq);
    //해당 마일스톤에서 생성된 업무리스트 중 마감된 상태인거
    List<TaskDTO> closedTaskListByMile(long mileSeq);





    //업무를 클릭하였을 때 업무 상세보기
    TaskDTO showTaskByTaskseq(long taskSeq);
    //title update
    void updateTitle(TaskDTO task);
    //content update
    void updateContent(TaskDTO task);
    //마일스톤 변경하기
    void updateMilestone(TaskDTO task);
    //업무상태 마감으로 변경
    void updateStatusFinish(long taskSeq);
    //업무상태 다시 활성화 시키기
    void updateStatusDefault(long taskSeq);
    //업무상태 종료로 변경
    void updateIsdelete(long taskSeq);
    //task_member테이블에 projmember_seq, task_seq셋팅
    void insertTaskMember(TaskmemberDTO taskmember);
    //업무 중요도 셋팅하기
    void updatePriority(TaskDTO task);
    //날짜 업데이트
    void updateDate(TaskDTO task);



}
