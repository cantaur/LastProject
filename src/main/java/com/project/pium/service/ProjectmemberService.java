package com.project.pium.service;

import com.project.pium.domain.ProjectmemberDTO;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;

public interface ProjectmemberService {

    void updateProfileS(ProjectmemberDTO projectmemberDTO);
    long findProjMemberSeq(@RequestParam("project_seq")long projSeq, @RequestParam("member_seq")long memSeq);
    ProjectmemberDTO showImage(long projmember_seq);



}
