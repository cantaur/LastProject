package com.project.pium.controller;

import com.project.pium.domain.SignDTO;
import com.project.pium.security.SecurityService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


/**
 * 회원가입을 위한 RestController
 */

@Log
@RestController
public class UserRestController {

    @Autowired
    private SecurityService userDetailsService;

    @PostMapping("/ajax/regist")
    public String saveUserInfo(@RequestBody SignDTO signDTO) throws Exception {
        return userDetailsService.InsertUser(signDTO);
    }

    @GetMapping("/signUpConfirm")
    public void signUpConfirm(@RequestParam Map<String, String> map){
        //email,authkey 일치할 경우 authStatus 업데이트
        log.info("#인증시도 "+map);



    }

}
