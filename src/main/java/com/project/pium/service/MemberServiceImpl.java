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
    public List<MemberDTO> list() {
        return memberMapper.selectAll();
    }
}
