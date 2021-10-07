package com.project.pium.service;

import com.project.pium.domain.LabelDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.mapper.TaskMapper;
import com.project.pium.mapper.WorklabelMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;

@Log
@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {
    private TaskMapper taskMapper;
    private WorklabelMapper worklabelMapper;

    @Override
    public TaskDTO showTaskByTaskseq(long taskSeq){
        return taskMapper.showTaskByTaskseq(taskSeq);
    }











    @Override
    public void createTask(TaskDTO taskDTO) {
        taskMapper.createTask(taskDTO);
    }

    @Override
    public List<TaskDTO> taskList(long projSeq) {
        return taskMapper.taskList(projSeq);
    }

    //마일스톤 페이지(지우면 안됨) 해당 마일스톤에서 생성된 업무 갯수
    @Override
    public int countTask(long mileSeq) {
        return taskMapper.countTask(mileSeq);
    }

    //마일스톤 페이지(지우면 안됨) 해당 마일스톤에서 완료된 업무의 갯수
    @Override
    public int countClosedTask(long mileSeq) {
        return taskMapper.countClosedTask(mileSeq);
    }

    //마일스톤 상세 페이지에서 milestone_seq=? 위치에 생성된 모든 업무 리스트 조회
    @Override
    public List<TaskDTO> taskListByMile(long mileSeq){
        List<TaskDTO> tasks= taskMapper.taskListByMile(mileSeq);
        log.info("#마일스톤=?에서 생성된 업무들"+tasks);

        return tasks;
    }

    //마일스톤 페이지(지우면 안됨) labelSeq로 라벨 이름 조회
    @Override
    public LabelDTO findLabelTitle(long labelSeq) {
        return worklabelMapper.findLabelTitle(labelSeq);
    }

    @Override
    public Long findLabelSeq(String labelTitle) {
        return worklabelMapper.findLabelSeq(labelTitle);
    }

    //label_title 넣어서 있는지 없는지 조사
    @Override
    public String chkLabel(String labelTitle) {
        return worklabelMapper.chkLabel(labelTitle);
    }

    @Override
    public String insertLabel(LabelDTO labelDTO, long taskSeq) {
        worklabelMapper.insertLabel(labelDTO); //새로운 라벨 insert
        long labelSeq= worklabelMapper.lastLabelSeq(); //해당 라벨seq 조회
        updateLabel(labelSeq,taskSeq);

        return "success";
    }






    @Override
    public List<TaskDTO> openTaskListByMile(long mileSeq) {
        return taskMapper.openTaskListByMile(mileSeq);
    }

    @Override
    public List<TaskDTO> closedTaskListByMile(long mileSeq) {
        return taskMapper.closedTaskListByMile(mileSeq);
    }




    @Override
    public void updateTitle(TaskDTO task){taskMapper.updateTitle(task);}

    @Override
    public void updateContent(TaskDTO task){taskMapper.updateContent(task);}

    @Override
    public void updateMilestone(TaskDTO task){taskMapper.updateMilestone(task);}

    @Override
    public void updateStatusFinish(long taskSeq){taskMapper.updateStatusFinish(taskSeq);}

    @Override
    public void updateStatusDefault(long taskSeq){taskMapper.updateStatusDefault(taskSeq);}

    @Override
    public void updateIsdelete(long taskSeq){taskMapper.updateIsdelete(taskSeq);}

    @Override
    public void insertTaskMember(TaskmemberDTO taskmember){taskMapper.insertTaskMember(taskmember);}

    @Override
    public void updatePriority(TaskDTO task){taskMapper.updatePriority(task);}

    @Override
    public void updateLabel(long labelSeq, long taskSeq) {
        taskMapper.updateLabel(labelSeq,taskSeq);
    }

    @Override
    public void updateDate(TaskDTO task){taskMapper.updateDate(task);}




}
