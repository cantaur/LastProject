package com.project.pium.mapper;

import com.project.pium.domain.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MemberMapper {
    List<MemberDTO> selectAll();
    long findUserNo(String mEmail);






    String findUserEmail(String mEmail);
    List<MemberDTO> selectAllByEmail(String mEmail);
    List<MemberDTO> selectAllByMseq(long mSEQ);




    void deleteUser(long mSEQ);

}
