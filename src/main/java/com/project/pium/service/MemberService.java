package com.project.pium.service;

import com.project.pium.domain.MemberDTO;
import java.util.List;

public interface MemberService {
    List<MemberDTO> selectAll();
    long findUserNo(String mEmail);
    String chkUser(String mEmail);




    String findUserEmail(String mEmail);
    List<MemberDTO> selectAllByEmail(String mEmail);
    List<MemberDTO> selectAllByMseq(long mSEQ);




    void deleteUser(long mSEQ);
}
