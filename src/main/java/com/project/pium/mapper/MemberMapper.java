package com.project.pium.mapper;

import com.project.pium.domain.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MemberMapper {
    List<MemberDTO> selectAll();
    long selectByMseq(String member_email);
    String selectByMemail(long member_seq);
    String selectByMpw(long member_seq);
    String selectByMplatform(long member_seq);
}
