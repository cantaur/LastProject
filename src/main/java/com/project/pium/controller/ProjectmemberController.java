package com.project.pium.controller;



import com.project.pium.domain.ProjectDTO;
import com.project.pium.domain.ProjectmemberDTO;
import com.project.pium.service.*;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class ProjectmemberController {
    private ProjectService projectService;
    private MemberService memberService;
    private ProjectmemberService projectmemberService;
    private FileStorageService fileStorageService;





    //현재 로그인한 유저의 세션값 얻어오는 로직 모듈화
    public String currentUserName(Principal principal){
        if(principal ==null){
            return "false";
        }else{
            String sessionEmail = principal.getName();
            return sessionEmail;
        }
    }

    //프로젝트멤버 프로필 변경
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/ajax/updateProfile")
    public String updateProfile(@RequestParam(value="project_seq") Integer projSeq,
                                @RequestParam(value="projmember_image", required = false) MultipartFile file,
                                @RequestParam(value="projmember_name") String name,
                                Principal principal) throws Exception {
        //1. 접속한 유저 이메일로 memberSeq 찾음
        String email= currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);

        

        log.info("업로드된 파일이 있는가? : "+file);
        log.info("뭘찍냐?"+projSeq+","+name);
        log.info("#file.getBytes()"+file.getBytes());



        //3. projectSeq와 memberSeq로 project_member seq 찾음
        long projMemberSeq = projectmemberService.findProjMemberSeq(projSeq,sessionSeq);
        //4. 집어넣음?
        ProjectmemberDTO projectmemberDTO = new ProjectmemberDTO();
        projectmemberDTO.setProjmember_name(name);
        projectmemberDTO.setProjmember_filename(file.getOriginalFilename());
        projectmemberDTO.setProjmember_filetype(file.getContentType());
        projectmemberDTO.setProjmember_data(file.getBytes());
        projectmemberDTO.setProjmember_seq(projMemberSeq);
        //5. 일단 업데이트로 감?
        projectmemberService.updateProfileS(projectmemberDTO);
        return "success";
    }


    //프로필 이미지 확인 성고오오오옹
    @GetMapping("/ajax/profile/{id}")
    public ResponseEntity<byte[]> findOne(@PathVariable long id) {
        ProjectmemberDTO projectmemberDTO = projectmemberService.showImage(id);
        log.info("마임타입이 뭐냐고"+projectmemberDTO.getProjmember_filetype());



        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", projectmemberDTO.getProjmember_filetype());
        headers.add("Content-Length", String.valueOf(projectmemberDTO.getProjmember_data().length));

        return new ResponseEntity<byte[]>(projectmemberDTO.getProjmember_data(), headers, HttpStatus.OK);
    }
    
    
//추가, 겹치지않게 백업해두셈


    //이 프로젝트에 참여한 모든 멤버의 정보
    //projmember_type, projmember_name, projmember_data, member_email
    @GetMapping("/ajax/allProjMembers/{project_seq}")
    public List<ProjectmemberDTO> projMembers(@PathVariable long project_seq){
        List<ProjectmemberDTO> memList = projectmemberService.allProjMembers(project_seq);

        return memList;
    }

    //관리자 권한 주기
    @PostMapping("/ajax/masterUpdate")
    public void masterget(@RequestBody Map<String, Integer> param, Principal principal){
        String email = currentUserName(principal);
        long member_seq = memberService.findUserNo(email);
        Long project_seq = Long.valueOf(param.get("project_seq"));
        long projmember_seq = projectmemberService.findProjMemberSeq(project_seq, member_seq);
     projectmemberService.mastergetS(projmember_seq);
    }

    //프로젝트 멤버 강퇴
    @DeleteMapping("/ajax/projectout")
    public void projectout(@RequestBody Map<String, Integer> param, Principal principal){
        String email = currentUserName(principal);
        long member_seq = memberService.findUserNo(email);
        Long project_seq = Long.valueOf(param.get("project_seq"));
        long projmember_seq = projectmemberService.findProjMemberSeq(project_seq, member_seq);
        projectmemberService.projectoutS(project_seq, projmember_seq);
    }

    //프로젝트 나가기
    @DeleteMapping("/ajax/projectexit")
    public void projectexit(@RequestBody Map<String, Integer> param, Principal principal){
        String email = currentUserName(principal);
        long member_seq = memberService.findUserNo(email);
        Long project_seq = Long.valueOf(param.get("project_seq"));
        long projmember_seq = projectmemberService.findProjMemberSeq(project_seq, member_seq);
        projectmemberService.projectexitS(project_seq, projmember_seq);
    }























}
