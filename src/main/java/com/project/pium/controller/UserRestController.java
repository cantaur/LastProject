package com.project.pium.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.project.pium.domain.SignDTO;
import com.project.pium.security.SecurityService;
import com.project.pium.service.MemberService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.lang.UsesSunMisc;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
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
    @Autowired
    private MemberService memberService;

    @PostMapping("/ajax/regist")
    public String saveUserInfo(@RequestBody SignDTO signDTO) throws Exception {

        String msg = userDetailsService.insertUser(signDTO);
        if(msg.equals("Duplicated")){
            log.info("중복된 이메일로 로그인 시도");
            return "fail";
        }else{
            return "success";
        }
    }



    @PostMapping("/ajax/google/login")
    public String saveUserGoogle(@RequestBody SignDTO signDTO, HttpServletRequest request) throws Exception {

        String msg = userDetailsService.signUpGoogle(signDTO);
        String mEmail=signDTO.getMember_email();
        if(msg.equals("loginGoogle")){ //이미 가입된 구글ID로 판별이 되었을 때 security 강제 로그인 시도
            String gEmail = memberService.findUserEmail(mEmail);
            UserDetails ckUserDetails = userDetailsService.loadUserByUsername(gEmail);
            Authentication authentication = new UsernamePasswordAuthenticationToken(ckUserDetails.getUsername(), ckUserDetails.getPassword(), ckUserDetails.getAuthorities());

            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
            return "successGoogleLogin";
        }else{
            return "successGoogleSignup";
        }
    }


    @PostMapping("/ajax/signUpConfirm")
    public void signUpConfirm(@RequestBody SignDTO signDTO){
        log.info("signDTO : "+signDTO);
        //email,authkey 일치할 경우 member_auth 테이블에 추가(==user 권한 생성)
        userDetailsService.updateUserRoll(signDTO);
    }


    @GetMapping("/ajax/loginUser")
    @ResponseBody
    public Object currentUserName(Principal principal) {
        return principal.getName();
    }







}
