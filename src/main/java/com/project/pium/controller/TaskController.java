package com.project.pium.controller;

import com.project.pium.domain.LabelDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.service.MemberService;
import com.project.pium.service.TaskService;
import com.project.pium.service.TaskmemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class TaskController {
    private TaskService taskService;
    private MemberService memberService;
    private TaskmemberService taskmemberService;

    //현재 로그인한 유저의 세션값 얻어오는 로직 모듈화
    public String currentUserName(Principal principal){
        if(principal ==null){
            return "false";
        }else{
            String sessionEmail = principal.getName();
            return sessionEmail;
        }
    }

    //업무를 클릭하였을때 나오는 업무 상세보기
    //task 테이블만 오는데 여기다가 배정된 멤버의 리스트도 와야한다
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
        log.info("#taskDTO"+taskDTO);
        log.info("#taskmemberDTOS"+taskmemberDTOS);
        tempTask.put("task", taskDTO);
        tempTask.put("taskMembers", taskmemberDTOS);
        tempTask.put("label", labelDTO);
        taskInfo.add(tempTask);

        return taskInfo;

        
    }


    //title update
    @ResponseBody
    @PostMapping("/ajax/updateTaskTitle")
    public void updateTitle(@RequestBody Map<String,Object> param){
        Long taskSeq = Long.valueOf(String.valueOf(param.get("taskSeq"))); //task_seq
        String teskTitle = String.valueOf(param.get("teskTitle"));
        taskService.updateTitle(teskTitle,taskSeq);
    }

    //content update
    @ResponseBody
    @PostMapping("/ajax/updateTaskCont")
    public void updateContent(@RequestBody Map<String,Object> param){
        Long taskSeq = Long.valueOf(String.valueOf(param.get("taskSeq"))); //task_seq
        String teskContent = String.valueOf(param.get("teskContent"));
        taskService.updateContent(teskContent,taskSeq);
    }

    //마일스톤 변경하기
    @ResponseBody
    @PostMapping("/ajax/changeMile")
    public void updateMilestone(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq")); //task_seq
        Long mileSeq= Long.valueOf(param.get("mileSeq")); //mileSeq
        taskService.updateMilestone(mileSeq,taskSeq);
    }


    //task 날짜 비우기(get으로 task_seq 주면 date에 null 셋팅)
    @GetMapping("/ajax/setDateEmpty/{taskSeq}")
    public void setDateEmpty(@PathVariable long taskSeq){
        taskService.setTaskDateEmpty(taskSeq);
    }



    //날짜 업데이트
    @PostMapping("/ajax/updateTaskDate")
    public void updateDate(@RequestBody TaskDTO taskdto){
        taskService.updateDate(taskdto);
    }

    //업무에 멤버 배정
    @PostMapping("/ajax/addMember")
    public void addTaskmember(@RequestBody TaskmemberDTO taskmember){
        log.info("#TaskController createTaskmember() : "+taskmember);
        taskService.insertTaskMember(taskmember);
    }



    //업무에 라벨 넣기
    @ResponseBody
    @PostMapping("/ajax/addLabel")
    public void addLabel(@RequestBody Map<String,Object> param){

        log.info("taskSeq, label : "+param);
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

    //업무에 중요도 셋팅하기
    @ResponseBody
    @PostMapping("/ajax/updatePriority")
    public void updatePriority(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq")); //task_seq
        int priorityCode= param.get("priorityCode"); //mileSeq
        taskService.updatePriority(priorityCode,taskSeq);
    }



    //업무 상태 마감으로 변경
    @ResponseBody
    @PostMapping("/ajax/closeTask")
    public void updateStatusFinish(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq"));
        taskService.updateStatusFinish(taskSeq);
    }

    //업무 다시 활성화 시키기
    @ResponseBody
    @PostMapping("/ajax/openTask")
    public void updateStatusDefault(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq"));
        taskService.updateStatusDefault(taskSeq);
    }

    //업무 삭제상태로 변경
    @ResponseBody
    @PostMapping("/ajax/deleteTask")
    public void updateIsdelete(@RequestBody Map<String,Integer> param){
        Long taskSeq= Long.valueOf(param.get("taskSeq"));
        taskService.updateIsdelete(taskSeq);
    }




























    //새 업무 생성
    @PostMapping("/ajax/createTask")
    public void createTask(@RequestBody TaskDTO taskDTO){
        log.info("#TaskController insert() : "+taskDTO);
        taskService.createTask(taskDTO);
    }

    //해당 프로젝트에서 생성된 모든 업무 리스트
    @GetMapping("/ajax/{projSeq}/tasklist")
    public List<TaskDTO> taskList(@PathVariable long projSeq){
        return taskService.taskList(projSeq);
    }
    
    //해당 마일스톤에서 생성된 전체 업무리스트(검증X)
    @GetMapping("/ajax/task/{mileSeq}")
    public List<TaskDTO> taskListByMile(@PathVariable long mileSeq){return taskService.taskListByMile(mileSeq);}

    







}
