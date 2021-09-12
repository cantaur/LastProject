package com.project.pium.controller;

import com.project.pium.domain.MemberDTO;
import com.project.pium.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log
@RestController
@RequestMapping("rest_member")
@AllArgsConstructor
public class TestController {
    private MemberService memberService;

    @GetMapping("read")
    public List<MemberDTO> read(){
        List<MemberDTO> list = memberService.list();
        log.info("#list"+list);
        return list;
    }
    //http://localhost:8000/rest_member/read 호출 성공


}
