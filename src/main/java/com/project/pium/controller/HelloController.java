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
    @GetMapping("/api/hello")
    public String hello(){
        return "안녕하세요. 현재 서버시간은 "+new Date() +"입니다. \n";
    }
}