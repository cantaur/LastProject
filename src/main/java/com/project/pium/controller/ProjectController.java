package com.project.pium.controller;

import com.project.pium.domain.ProjectDTO;
import com.project.pium.service.MemberService;
import com.project.pium.service.ProjectService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.SpinnerUI;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class ProjectController {

    private ProjectService projectService;
    private MemberService memberService;


    //현재 로그인한 유저의 세션값 얻어오는 로직 모듈화
    public String currentUserName(Principal principal){
        if(principal ==null){
            return "false";
        }else{
            String sessionEmail = principal.getName();
            return sessionEmail;
        }
    }

    //새 프로젝트 만들기
    @PostMapping("/ajax/createProject")
    public String createProject(@RequestBody ProjectDTO projectDTO, Principal principal){
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);
        projectDTO.setMember_seq(sessionSeq);

        String msg= projectService.insertProject(projectDTO);
        if(msg.equals("success")){
            return "success";
        }else {
            return "fail";
        }
    }


    //로그인한 유저가 참여 중인 모든 프로젝트 리스트
    @GetMapping ("/ajax/myproject")
    public List<ProjectDTO> myProject(Principal principal){
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);
        List<ProjectDTO> myProject = projectService.myProject(sessionSeq);
        log.info("#myProject"+myProject);
        return myProject;
    }

    //프로젝트 수정 버튼 눌렀을 때 수행되는 메소드
    @PutMapping("/ajax/updateProject")
    public void updateProject(@RequestBody ProjectDTO projectDTO, Principal principal){
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);
        projectService.updateProject(projectDTO);
    }














    //로그인한 유저가 참여 중이며 현재 진행 중인 프로젝트 리스트
    @GetMapping("/ajax/opendproject")
    public List<ProjectDTO> opendProject(Principal principal){

        return null;

    }

    //로그인한 유저가 참여 중이며 완료처리된 프로젝트 리스트
    @GetMapping("/ajax/closedproject")
    public List<ProjectDTO> closedProject(Principal principal){

        return null;

    }




















    @GetMapping("searchProject")
    public List<ProjectDTO> list(){
        List<ProjectDTO> list = projectService.listS();
        return list;
    }
    //http://127.0.0.1:8000/project/searchProject 호출 성공

    @GetMapping("projectSelectProceeding")
    public List<ProjectDTO> projectSelectProceeding(){
        List<ProjectDTO> list = projectService.projectSelectProceeding();
        return list;
    }
    //http://127.0.0.1:8000/project/projectSelectProceeding 호출 성공
    @GetMapping("projectSelectEnd")
    public List<ProjectDTO> projectSelectEnd(){
        List<ProjectDTO> list = projectService.projectSelectEnd();
        return list;
    }


    @PutMapping("updateStatus")
    public void updateStatus(@RequestBody ProjectDTO projectDTO){
        projectService.updateStatus(projectDTO);
    }
    /*at Talend API Tester
      method : put
      url : http://127.0.0.1:8000/project/updateStatus
      {"project_status":"1","project_seq":28}
      Response 200 코드 확인 완료
    */
    @PutMapping("updateIsdelete")
    public void updateIsdelete(@RequestBody ProjectDTO projectDTO){
        projectService.updateIsdelete(projectDTO);
    }
    /*at Talend API Tester
      method : put
      url : http://127.0.0.1:8000/project/updateIsdelete
      {"project_isdelete":"1","project_seq":28}
      Response 200 코드 확인 완료
    */
    @PutMapping("updateTitle")
    public void updateTitle(@RequestBody ProjectDTO projectDTO){
        projectService.updateTitle(projectDTO);
    }
    /*at Talend API Tester
     method : put
     url : http://127.0.0.1:8000/project/updateTitle
     {"project_title":"updateTitle TEST","project_seq":28}
     Response 200 코드 확인 완료
   */
    @PutMapping("updateContent")
    public void updateContent(@RequestBody ProjectDTO projectDTO){
        projectService.updateContent(projectDTO);
    }
    /*at Talend API Tester
     method : put
     url : http://127.0.0.1:8000/project/updateContent
     {"project_content":"updateContent TEST","project_seq":28}
     Response 200 코드 확인 완료
   */

    @PutMapping("updateEnddate")
    public void updateEnddate(@RequestBody ProjectDTO projectDTO){
        projectService.updateEnddate(projectDTO);
    }
    /*at Talend API Tester
     method : put
     url : http://127.0.0.1:8000/project/updateEnddate
    {
      "project_seq" : "28"
    }
     Response 200 코드 확인 완료
   */
}
