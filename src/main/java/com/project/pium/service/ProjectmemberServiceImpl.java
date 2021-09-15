package com.project.pium.service;

import com.project.pium.domain.ProjectmemberDTO;
import com.project.pium.mapper.ProjectMapper;
import com.project.pium.mapper.ProjectmemberMapper;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
@Log
@AllArgsConstructor
@Service

public class ProjectmemberServiceImpl implements ProjectmemberService  {
    private ProjectmemberMapper mapper;

    @Override
    public List<ProjectmemberDTO> selectAllS() {
        return mapper.selectAll();
    }

    @Override
    public List<ProjectmemberDTO> selectByPmseqS(long projmember_seq) {
        return mapper.selectByPmseq(projmember_seq);
    }

    @Override
    public List<ProjectmemberDTO> selectByMseqS(long member_seq) {
        return mapper.selectByMseq(member_seq);
    }

    @Override
    public List<ProjectmemberDTO> selectByPmnameS(String projmember_name) {
        return mapper.selectByPmname(projmember_name);
    }

    @Override
    public String selectByBossS(String projmember_type) {
        return mapper.selectByBoss(projmember_type);
    }

    @Override
    public void insertByPmS(ProjectmemberDTO projectmemberDTO) {
        mapper.insertByPm(projectmemberDTO);
    }

    @Override
    public void deleteByPmS(long projmember_seq) {
        mapper.deleteByPm(projmember_seq);
    }

    @Override
    public void updateByPmNameS(ProjectmemberDTO projectmemberDTO) {
        mapper.updateByPmName(projectmemberDTO);
    }


    @Override
    public void updateByPmImgS(ProjectmemberDTO projectmemberDTO) {
        mapper.updateByPmImg(projectmemberDTO);
    }

    @Override
    public void updateByPmTypeUpS(long projmember_seq) {
        mapper.updateByPmTypeUp(projmember_seq);
    }

    @Override
    public void updateByPmTypeDownS(long projmember_seq) {
        mapper.updateByPmTypeDown(projmember_seq);
    }
}
