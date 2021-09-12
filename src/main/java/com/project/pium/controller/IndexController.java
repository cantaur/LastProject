package com.project.pium.controller;

import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpSession;


/**
 * 사용자 session 정보가 있으면 메인 화면으로, 없으면 login view로 연결
 */

@Log
@Controller
@AllArgsConstructor
public class IndexController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(HttpSession session) {
        Object member = session.getAttribute("loginOk");
        String memberEmail = (String) member;
        if(member ==null){
            return "index"; //login.jsp 호출
        }
        return "redirect:index";
    }


}
