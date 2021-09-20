package com.project.pium.controller;

import com.project.pium.domain.SignDTO;
import com.project.pium.security.SecurityService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


/**
 * 회원가입을 위한 RestController
 * 인증메일 컨펌
 */

@Log
@RestController
public class UserRestController {

    @Autowired
    private SecurityService userDetailsService;

    @PostMapping("/ajax/regist")
    public String saveUserInfo(@RequestBody SignDTO signDTO) throws Exception {

        String msg = userDetailsService.insertUser(signDTO);
        if(msg.equals("Duplicated")){
            log.info("실패하면 이게 뜬다아아아ㅏㅇ");
            return "fail";

        }else{
            return "success";
        }
    }

    @PostMapping("/ajax/signUpConfirm")
    public void signUpConfirm(@RequestBody SignDTO signDTO){
        log.info("signDTO : "+signDTO);
        //email,authkey 일치할 경우 member_auth 테이블에 추가(==user 권한 생성)
        userDetailsService.updateUserRoll(signDTO);
    }

}
