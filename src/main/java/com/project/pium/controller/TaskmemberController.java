package com.project.pium.controller;

import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.service.TaskmemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("Tm")
@AllArgsConstructor
public class TaskmemberController {
   private TaskmemberService service;



    @GetMapping("selectByTm/{seq}")
    public List<TaskmemberDTO> selectTmS(@PathVariable("seq") long seq){ //업무멤버번호로 조회
        List<TaskmemberDTO> list =service.selectByTmS(seq);
        return list;
    } //http://localhost:8000/Tm/selectByTm/2 성공



    @GetMapping("selectByPm/{seq}")
    public List<TaskmemberDTO> selectByPm(@PathVariable("seq") long seq){
        List<TaskmemberDTO> list = service.selectByPmS(seq);
        return list;
    } // http://localhost:8000/Tm/selectByPm/17 성공

    @PostMapping("insertByTm")
    public void insertByTm(@RequestBody TaskmemberDTO DTO){
        service.insertByTmS(DTO);
    } //http://localhost:8000/Tm/insertByTm
    //{"task_seq":8, "projmember_seq":17} 성공

    @PutMapping("delete/{seq}")
    public void delete(@PathVariable("seq")long seq){
        service.deleteS(seq);
    } //http://localhost:8000/Tm/delete/14 성공
}
