package com.project.pium.controller;

import com.project.pium.domain.ProjectDTO;
import com.project.pium.service.ProjectService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log
@RestController
@RequestMapping("rest_jg")
@AllArgsConstructor
@ResponseBody
public class JGController {

    private ProjectService projectService;

    @GetMapping("searchProject")
    public List<ProjectDTO> list(){
        List<ProjectDTO> list = projectService.listS();
        return list;
    }

    //http://127.0.0.1:8000/rest_jg/searchProject

    @GetMapping("searchMemberSeq")
    public Long selectByMemberSeq(String member_email){
        Long projectDTO = projectService.selectByMemberSeqS(member_email);
        return projectDTO;
    }



}
