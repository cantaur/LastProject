package com.project.pium.controller;

import com.project.pium.domain.MemberDTO;
import com.project.pium.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Date;

@RestController
public class HelloController {
    @GetMapping("/pium/rest/session")
    public String logintest(){
        return "true";
    }
    @GetMapping("/pium/rest/session2")
    public String logintest2(){
        return "false";
    }
}