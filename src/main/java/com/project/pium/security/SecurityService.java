package com.project.pium.security;

import com.project.pium.domain.SignDTO;
import com.project.pium.email.EmailSenderService;
import com.project.pium.mapper.SignMapper;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.Map;

@Service
@Log
public class SecurityService implements UserDetailsService {

    @Autowired
    private SignMapper signMapper;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /* DB에서 유저정보를 불러온다.
     * Custom한 Userdetails 클래스를 리턴 해주면 된다.
     * */
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        log.info("#id : "+id);

        ArrayList<SignDTO> userAuthes = signMapper.findByUserId(id);
        log.info("#userAuthes"+userAuthes);
        log.info("#userAuthes size: "+userAuthes.size());

        if(userAuthes.size() == 0) {
            throw new UsernameNotFoundException("User "+id+" Not Found!");
        }
        return new MemberPrincipalVO(userAuthes);
    }

    //이메일 인증 완료 서비스 : member_auth 테이블에 추가(==user 권한 생성)
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public String updateUserRoll(Map<String, String> map, SignDTO signDTO){
        log.info("#map"+map);
        String email= map.get("email");
        String authKey= map.get("authKey");
        if(authKey==signDTO.getAuthKey()){
            int userNo = signMapper.findUserNo(email);
            log.info("#userNo : "+userNo);
            int roleNo = signMapper.findRoleNo("user");
            log.info("#roleNo : "+roleNo);
            signMapper.userRoleSave(userNo, roleNo);
        }
        return "success";
    }




    //회원가입 서비스 : member 테이블에 추가, 인증 이메일 발송, 가입 대기 상태
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public String insertUser(SignDTO signDTO) throws Exception{

        signDTO.setMember_pw(bCryptPasswordEncoder.encode(signDTO.getMember_pw())); //암호화
        log.info("#입력된 이메일주소: "+signDTO.getMember_email());
        log.info("#유저 비밀번호 :"+signDTO.getMember_pw());
        log.info("#플랫폼 : "+signDTO.getMember_platform());
        int flag = signMapper.signup(signDTO);
        log.info("#flag(1이면 성공): "+flag);

        //임의의 authKey 생성 & 이메일 발송
        String authKey = emailSenderService.sendAuthMail(signDTO.getMember_email());
        log.info("#생성된 authkey"+authKey);
        signDTO.setAuthKey(authKey);
        String email = signDTO.getMember_email();
        String setAuthKey = signDTO.getAuthKey();
        signMapper.authkeySave(setAuthKey,email);

        return "success";
    }
}
