package com.project.pium.service;

import com.project.pium.domain.ProjectmemberDTO;


import java.util.List;

public interface ProjectmemberService {
    List<ProjectmemberDTO> selectAllS();//전체조회
    List<ProjectmemberDTO> selectByPmseqS(long projmember_seq);//플젝멤버번호로 조회
    List<ProjectmemberDTO> selectByMseqS(long member_seq);//멤버 번호로 조회
    List<ProjectmemberDTO> selectByPmnameS(String projmember_name);//이름으로 조회
    String selectByBossS(String projmember_type);// 관리자 이름 찾기

    void insertByPmS(ProjectmemberDTO projectmemberDTO);//추가
    void deleteByPmS(long projmember_seq);//삭제
    void updateByPmNameS(ProjectmemberDTO projectmemberDTO);//이름 바꾸기
    void updateByPmImgS(ProjectmemberDTO projectmemberDTO);//이미지 바꾸기
    void updateByPmTypeUpS(long projmember_seq);//관리자 권환 획득
    void updateByPmTypeDownS(long projmember_seq);//관리자 권환 상실
}
