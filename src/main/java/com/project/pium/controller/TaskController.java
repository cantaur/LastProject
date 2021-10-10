package com.project.pium.controller;

import com.project.pium.domain.LabelDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.service.TaskService;
import com.project.pium.service.TaskmemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.apache.tomcat.util.digester.ArrayStack;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class TaskController {
    private TaskService taskService;
    private TaskmemberService taskmemberService;

    //업무페이지>새 업무 생성
    @PostMapping("/ajax/createTask")
    public void createTask(@RequestBody Map<String,Object> param) throws ParseException {
        log.info("#param: "+param);
        //1. TaskDTO 객체 생성
        Map<String,Object> temp = (Map<String, Object>) param.get("taskInfo");
        String task_title= temp.get("task_title").toString();
        String task_content= temp.get("task_content").toString();
        
        Long projmember_seq= Long.valueOf(temp.get("projmember_seq").toString());
        // Long milestone_seq= Long.valueOf(temp.get("milestone_seq").toString());
        Long milestone_seq = null;
        Long project_seq= Long.valueOf(temp.get("project_seq").toString());


        
        if(temp.get("task_startdate") == ""){
          TaskDTO taskDTO = new TaskDTO(-1,task_title,task_content,null,null,null,null,null,null,projmember_seq,milestone_seq,project_seq,null,-1);
          taskService.createTask(taskDTO);
        } else {
            String tempStartdate= temp.get("task_startdate").toString();
            String tempDuedate= temp.get("task_duedate").toString();

            Timestamp task_startdate = Timestamp.valueOf(temp.get("task_startdate").toString()+" 00:00:00.0");
            Timestamp task_duedate = Timestamp.valueOf(temp.get("task_duedate").toString()+" 00:00:00.0");

            TaskDTO taskDTO = new TaskDTO(-1,task_title,task_content,null,null,task_startdate,task_duedate,null,null,projmember_seq,milestone_seq,project_seq,null,-1);
            taskService.createTask(taskDTO);
        }

        

        //2. TaskmemberDTO 객체 생성
        ArrayList<Object> members = (ArrayList<Object>) param.get("memberInfo");
        for(int i=0; i<members.size(); i++){
            Long tempMember = Long.valueOf(members.get(i).toString());
            log.info("이건 뭐지"+tempMember);
            taskService.insertTaskMember(tempMember);
        }


    }

    //해당 프로젝트에서 생성된 모든 업무 리스트
    @GetMapping("/ajax/{projSeq}/tasklist")
    public List<TaskDTO> taskList(@PathVariable long projSeq){
        return taskService.taskList(projSeq);
    }

    //해당 마일스톤에서 생성된 전체 업무리스트
    @GetMapping("/ajax/task/{mileSeq}")
    public List<TaskDTO> taskListByMile(@PathVariable long mileSeq){
        return taskService.taskListByMile(mileSeq);
    }


    //업무를 클릭하였을때 나오는 업무 상세보기
    @GetMapping("/ajax/taskView/{taskSeq}")
    public ArrayList<Object> showTaskByTaskseq(@PathVariable long taskSeq){
        //빈 배열 선언 및 초기화
        ArrayList<Object> taskInfo = new ArrayList<>();
        LinkedHashMap<String,Object> tempTask = new LinkedHashMap<>();

        //업무 상세조회
        TaskDTO taskDTO= taskService.showTaskByTaskseq(taskSeq);
        //업무에 배정된 멤버 조회
        List<TaskmemberDTO> taskmemberDTOS = taskmemberService.selectByTaskSeq(taskSeq);
        //업무의 라벨 조회
        LabelDTO labelDTO = taskService.findLabelTitle(taskDTO.getLabel_seq());
        tempTask.put("task", taskDTO);
        tempTask.put("taskMembers", taskmemberDTOS);
        tempTask.put("label", labelDTO);
        taskInfo.add(tempTask);

        return taskInfo;


    }


    //업무 모달>title update
    @ResponseBody
    @PostMapping("/ajax/updateTaskTitle")
    public void updateTitle(@RequestBody Map<String,Object> param){
        Long taskSeq = Long.valueOf(String.valueOf(param.get("taskSeq"))); //task_seq
        String taskTitle = String.valueOf(param.get("taskTitle"));
        log.info("taskTitle : "+taskTitle+", taskSeq : "+taskSeq);
        taskService.updateTitle(taskTitle,taskSeq);
    }

    //업무 모달>content update
    @ResponseBody
    @PostMapping("/ajax/updateTaskCont")
    public void updateContent(@RequestBody Map<String,Object> param){
        Long taskSeq = Long.valueOf(String.valueOf(param.get("taskSeq"))); //task_seq
        String taskContent = String.valueOf(param.get("taskContent"));
        log.info("taskContent : "+taskContent+", taskSeq : "+taskSeq);
        taskService.updateContent(taskContent,taskSeq);
    }

    //업무 모달>마일스톤 변경하기
    @ResponseBody
    @PostMapping("/ajax/changeMile")
    public void updateMilestone(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq")); //task_seq
        Long mileSeq= Long.valueOf(param.get("mileSeq")); //mileSeq
        log.info("mileSeq : "+mileSeq+", taskSeq : "+taskSeq);
        taskService.updateMilestone(mileSeq,taskSeq);
    }


    //업무 모달>task 날짜 비우기(get으로 task_seq 주면 date에 null 셋팅)
    @GetMapping("/ajax/setDateEmpty/{taskSeq}")
    public void setDateEmpty(@PathVariable long taskSeq){
        taskService.setTaskDateEmpty(taskSeq);
    }



    //업무 모달>날짜 업데이트
    @PostMapping("/ajax/updateTaskDate")
    public void updateDate(@RequestBody TaskDTO taskdto){
        log.info("taskdto : "+taskdto);
        taskService.updateDate(taskdto);
    }

    //업무 모달>업무에 멤버 배정
    @PostMapping("/ajax/addMember")
    public void addTaskmember(@RequestBody Map<String,Object> param){
        Long taskSeq = Long.valueOf(String.valueOf(param.get("taskSeq"))); //task_seq
        Long projmemberSeq = Long.valueOf(String.valueOf(param.get("projmemberSeq")));

        taskService.updateTaskMember(taskSeq,projmemberSeq);
    }



    //업무 모달>업무에 라벨 넣기
    @ResponseBody
    @PostMapping("/ajax/addLabel")
    public void addLabel(@RequestBody Map<String,Object> param){

        Long taskSeq = Long.valueOf(String.valueOf(param.get("taskSeq"))); //task_seq
        String labelTemp = String.valueOf(param.get("label"));
        String msg= taskService.chkLabel(labelTemp);
        log.info("msg : "+msg);

        if(msg.equals("success")){
            long labelSeq= taskService.findLabelSeq(labelTemp);
            taskService.updateLabel(labelSeq, taskSeq);
        }else{
            LabelDTO labelDTO = new LabelDTO(-1,labelTemp);
            taskService.insertLabel(labelDTO,taskSeq);
        }
    }

    //업무 모달>업무에 중요도 셋팅하기
    @ResponseBody
    @PostMapping("/ajax/updatePriority")
    public void updatePriority(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq")); //task_seq
        String priorityCode = String.valueOf(param.get("priorityCode")); //중요도코드(문자열임)
        log.info("priorityCode : "+priorityCode+", taskSeq : "+taskSeq);
        taskService.updatePriority(priorityCode,taskSeq);
    }



    //업무 모달>업무 상태 마감으로 변경
    @ResponseBody
    @PostMapping("/ajax/closeTask")
    public void updateStatusFinish(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq"));
        taskService.updateStatusFinish(taskSeq);
    }

    //업무 모달>업무 다시 활성화 시키기
    @ResponseBody
    @PostMapping("/ajax/openTask")
    public void updateStatusDefault(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq"));
        taskService.updateStatusDefault(taskSeq);
    }

    //업무 모달>업무 삭제상태로 변경
    @ResponseBody
    @PostMapping("/ajax/deleteTask")
    public void updateIsdelete(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq"));
        taskService.updateIsdelete(taskSeq);
    }

}
