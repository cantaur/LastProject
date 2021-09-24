package com.project.pium.controller;

import com.project.pium.domain.MemberDTO;
import com.project.pium.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("rest_member")
@AllArgsConstructor
public class MemberController {
    private MemberService memberService;

    @GetMapping("read")
    public List<MemberDTO> read(){
        List<MemberDTO> list = memberService.selectAll();
        log.info("#list"+list);
        return list;
    }
    //http://localhost:8000/rest_member/read 호출 성공

    @GetMapping(value = "read", params = {"email"})
    public List<MemberDTO> read(@RequestParam String email){
        List<MemberDTO> memberByEmail = memberService.selectAllByEmail(email);
        return memberByEmail;
    }//http://localhost:8000/rest_member/read?email=abcd1234@gmail.com 호출 성공

    @GetMapping("read/{mSeq}")
    public List<MemberDTO> read(@PathVariable long mSeq){
        List<MemberDTO> memberBySeq = memberService.selectAllByMseq(mSeq);
        return memberBySeq;
    }//http://localhost:8000/rest_member/read/5 호출 성공





    @DeleteMapping("delete/{mSeq}")
    public void deleteUser(@PathVariable long mSeq){
        memberService.deleteUser(mSeq);
    }
    // at Talend API Tester
    // method : delete
    // http://localhost:8000/rest_member/delete/17
    // Response 200 코드 확인 완료

}
