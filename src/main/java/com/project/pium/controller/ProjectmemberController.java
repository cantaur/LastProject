package com.project.pium.controller;


import com.project.pium.domain.ProjectDTO;
import com.project.pium.domain.ProjectmemberDTO;
import com.project.pium.service.ProjectmemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("Pm")
@AllArgsConstructor
public class ProjectmemberController {
    private ProjectmemberService service;

    @GetMapping("AllPm") //모든 플젝멤버 조회
    public List<ProjectmemberDTO> AllPm() {
        List<ProjectmemberDTO> list = service.selectAllS();
        return list;
    } //http://localhost:8000/Pm/AllPm 성공

    @GetMapping("selectPm/{pm_seq}") //플젝멤버번호로 조회
    public List<ProjectmemberDTO> selectPm(@PathVariable("pm_seq")long projmember_seq) {
        List<ProjectmemberDTO> list= service.selectByPmseqS(projmember_seq);
        return list;
    } //http://localhost:8000/Pm/selectPm/1 성공

    @GetMapping("selectM/{m_seq}") //멤버번호로 조회
    public List<ProjectmemberDTO> selectM(@PathVariable("m_seq")long member_seq) {
        List<ProjectmemberDTO> list= service.selectByMseqS(member_seq);
        return list;
    }

    @GetMapping("selectName/{Pname}") //이름으로 조회
    public List<ProjectmemberDTO> selectM(@PathVariable("Pname")String name) {
        List<ProjectmemberDTO> list= service.selectByPmnameS(name);
        return list;
    } //http://localhost:8000/Pm/selectName/이가은 성공

    @GetMapping("selectBoss/{Type}") //관리자 이름 찾기
    public String selectBoss(@PathVariable String type) {
        return service.selectByBossS(type);
    } //http://localhost:8000/Pm/selectBoss/1 실패
    //파라미터값에 String 값을 넣어줘야하는데 값이 0,1 이라 흠..

    @PostMapping("insert") //추가
    public void insert(@RequestBody ProjectmemberDTO dto) {
        service.insertByPmS(dto);
    } //talend 추가 성공

   @PutMapping("delete/{seq}") //삭제
    public void delete(@PathVariable("seq") long pm_seq){
        service.deleteByPmS(pm_seq);
   } //talend 삭제 성공

    @PatchMapping("updateN/{seq}") //이름 변경
    public void updateName(@PathVariable("seq") long seq, @RequestBody ProjectmemberDTO DTO) {
        DTO.setProjmember_seq(seq);
        service.updateByPmNameS(DTO);
    } // 시퀀스 set으로 넘겨줘서 성공

    @PatchMapping("updateI/{seq}") //이미지 변경
    public void updateImage(@PathVariable("seq") long seq, @RequestBody ProjectmemberDTO DTO) {
        DTO.setProjmember_seq(seq);
        service.updateByPmImgS(DTO);
    } //시퀀스 set으로 넘겨줘서 성공 (한글깨짐)

    @PatchMapping("updateTypeU/{Pmseq}")//관리자 권한 획득
    public void updateTypeUp(@PathVariable long Pmseq) {
        service.updateByPmTypeUpS(Pmseq);
    } //talend 권한 획득 성공

    @PatchMapping("updateTypeD/{Pmseq}")//관리자 권한 상실
    public void updateTypeDown(@PathVariable long Pmseq) {
        service.updateByPmTypeDownS(Pmseq);
    } //talend 권한 상실 성공


}
