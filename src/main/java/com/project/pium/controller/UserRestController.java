package com.project.pium.controller;

import com.project.pium.domain.SignDTO;
import com.project.pium.security.SecurityService;
import com.project.pium.security.oauth2.NaverLoginBO;
import com.project.pium.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.extern.java.Log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;



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

    private NaverLoginBO naverLoginBO;
    private String apiResult = null;

    @Autowired
    private void setNaverLoginBO(NaverLoginBO naverLoginBO) {
        this.naverLoginBO = naverLoginBO;
    }

    //local signup
    @PostMapping("/ajax/regist")
    public String saveUserInfo(@RequestBody SignDTO signDTO) throws Exception {

        String msg = userDetailsService.insertUser(signDTO);
        if(msg.equals("Duplicated")){
            log.info("중복된 이메일로 회원가입 시도");
            return "fail";
        }else{
            return "success";
        }
    }

    //roll "user"로 상태변경
    @PostMapping("/ajax/signUpConfirm")
    public void signUpConfirm(@RequestBody SignDTO signDTO){
        log.info("signDTO : "+signDTO);
        //email,authkey 일치할 경우 member_auth 테이블에 추가(==user 권한 생성)
        userDetailsService.updateUserRoll(signDTO);
    }



    //google signup, login
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



    //로그인 첫 화면 요청 메소드
    @RequestMapping("/ajax/naver")
    public String login(HttpSession session) {
        /* 네이버아이디로 인증 URL을 생성하기 위하여 naverLoginBO클래스의 getAuthorizationUrl메소드 호출 */
        String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
        //https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sE***************&
        //redirect_uri=http%3A%2F%2F211.63.89.90%3A8090%2Flogin_project%2Fcallback&state=e68c269c-5ba9-4c31-85da-54c16c658125

        //https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=QXwMhEJgn0WCLxz2R4V3&
        //redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Ftest&state=722b7f73-71dc-452e-8d67-702a851633f6
        log.info("네이버:" + naverAuthUrl);

        return naverAuthUrl;
    }

    //네이버 로그인 성공시 callback호출 메소드
    @RequestMapping(value = "/test")
    public String callback(@RequestParam String code, @RequestParam String state, HttpSession session) throws IOException {
        log.info("여기는 callback");
        OAuth2AccessToken oauthToken;
        oauthToken = naverLoginBO.getAccessToken(session, code, state);
        log.info("#session"+session);
        log.info("#code"+code);
        log.info("#state"+state);
        ObjectNode userInfo = new ObjectMapper().readValue(naverLoginBO.getUserProfile(oauthToken), ObjectNode.class);
        log.info("#userInfo: "+userInfo);
        String apiResult = naverLoginBO.getUserProfile(oauthToken);
        log.info("apiResult : "+apiResult);


        return apiResult;
    }



    @PostMapping("ajax/naverUser")
    public String naverLogin(@RequestParam String token){
        log.info("#token"+token);
        return "success";

    }


















    @GetMapping("/ajax/loginUser")
    @ResponseBody
    public Object currentUserName(Principal principal) {
        return principal.getName();
    }



}
