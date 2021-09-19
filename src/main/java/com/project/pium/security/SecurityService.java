package com.project.pium.security;

import com.project.pium.domain.SignDTO;
import com.project.pium.domain.MemberPrincipalVO;
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

@Service
@Log
public class SecurityService implements UserDetailsService {

    @Autowired
    private SignMapper signMapper;

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

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public String InsertUser(SignDTO signDTO) throws Exception{

        signDTO.setMember_pw(bCryptPasswordEncoder.encode(signDTO.getMember_pw()));
        log.info("비밀번호"+signDTO.getMember_pw());
        int flag = signMapper.signup(signDTO);
        log.info("#flag: "+flag);
        if (flag > 0) {

            int userNo = signMapper.findUserNo(signDTO.getMember_email());
            log.info("#userNo"+userNo);
            log.info("권한확인"+signDTO.getAuthorities_name());
            int roleNo = signMapper.findRoleNo("user");
            log.info("#roleNo"+roleNo);
            signMapper.userRoleSave(userNo, roleNo);

            return "success";
        }
        return "fail";
    }
}
