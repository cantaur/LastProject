package com.project.pium.service;

import com.project.pium.domain.MemberDTO;
import com.project.pium.mapper.MemberMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import java.util.List;

@Log
@AllArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private MemberMapper memberMapper;

    @Override
    public List<MemberDTO> selectAll() {
        return memberMapper.selectAll();
    }

    @Override
    public String findUserEmail(String mEmail) {
        return memberMapper.findUserEmail(mEmail);
    }

    @Override
    public List<MemberDTO> selectAllByEmail(String mEmail) {
        return memberMapper.selectAllByEmail(mEmail);
    }

    @Override
    public List<MemberDTO> selectAllByMseq(long mSEQ) {
        return memberMapper.selectAllByMseq(mSEQ);
    }

    @Override
    public int findUserNo(String id) {
        return memberMapper.findUserNo(id);
    }

    @Override
    public void insertUser(MemberDTO memberDTO) {
        memberMapper.insertUser(memberDTO);
    }

    @Override
    public void deleteUser(long mSEQ) {
        memberMapper.deleteUser(mSEQ);

    }


}
