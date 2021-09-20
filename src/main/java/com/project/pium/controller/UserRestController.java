package com.project.pium.controller;

import com.project.pium.domain.SignDTO;
import com.project.pium.security.SecurityService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * 회원가입을 위한 RestController
 */

@Log
@RestController
public class UserRestController {

    @Autowired
    private SecurityService userDetailsService;

    @PostMapping("/signup")
    public String saveUserInfo(@RequestBody SignDTO signDTO) throws Exception {
        return userDetailsService.InsertUser(signDTO);
    }

}
