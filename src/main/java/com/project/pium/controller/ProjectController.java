package com.project.pium.controller;

import com.project.pium.domain.ProjectDTO;
import com.project.pium.service.MemberService;
import com.project.pium.service.ProjectService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.SpinnerUI;
import java.security.Principal;
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



    //로그인한 유저가 참여 중인 모든 프로젝트 리스트
    @GetMapping ("/ajax/myproject")
    public List<ProjectDTO> myProject(Principal principal){
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);
        List<ProjectDTO> myProject = projectService.myProject(sessionSeq);
        log.info("#myProject"+myProject);
        return myProject;
    }

    //로그인한 유저가 참여 중이며 현재 진행 중인 프로젝트 리스트
    @GetMapping("/ajax/opendproject")
    public List<ProjectDTO> opendProject(Principal principal){
    String email = currentUserName(principal);
    long member_seq = memberService.findUserNo(email);
    List<ProjectDTO> list = projectService.projectSelectProceeding(member_seq);
    log.info("#######"+ list);
        return list;

    }

    //로그인한 유저가 참여 중이며 완료처리된 프로젝트 리스트
    @GetMapping("/ajax/closedproject")
    public List<ProjectDTO> closedProject(Principal principal){
            String email = currentUserName(principal);
            long member_seq = memberService.findUserNo(email);
            List<ProjectDTO> list = projectService.projectSelectEnd(member_seq);
            return list;
    }






















    @GetMapping("searchProject")
    public List<ProjectDTO> list(){
        List<ProjectDTO> list = projectService.listS();
        return list;
    }
    //http://127.0.0.1:8000/project/searchProject 호출 성공


    //http://127.0.0.1:8000/project/searchMemberSeq/abcd1234@gmail.com 호출 성공
    @PostMapping("insert")
    public void insert(@RequestBody ProjectDTO projectDTO){
        projectService.insertS(projectDTO);
    }
    /*at Talend API Tester
      method : post
      http://127.0.0.1:8000/project/insert
      {
        "project_title":"TESTProject",
        "project_content":"TEST Project Content",
        "project_status":"0",
        "project_isdelete":"0",
        "member_seq":1
      }
      Response 200 코드 확인 완료
    */
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
    @PutMapping("updateProject")
    public void updateProject(@RequestBody ProjectDTO projectDTO){
        projectService.updateProject(projectDTO);
    }
    /*at Talend API Tester
     method : put
     url : http://127.0.0.1:8000/project/updateProject
     {
        "project_title" : "제목",
        "project_content" : "바뀔거에요",
        "project_status" : "0",
        "project_isdelete" : "0",
        "project_startdate" : 20210910,
        "project_duedate" : 20211026,
        "project_seq" : "28"
     }
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
