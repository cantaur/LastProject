package com.project.pium.service;

import com.project.pium.domain.MemberDTO;
import java.util.List;

public interface MemberService {
    List<MemberDTO> selectAll();
    List<MemberDTO> selectAllByEmail(String mEmail);
    List<MemberDTO> selectAllByMseq(long mSEQ);

    void insertUser(MemberDTO memberDTO);
    void deleteUser(long mSEQ);
}
