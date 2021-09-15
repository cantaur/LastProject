package com.project.pium.controller;

import com.project.pium.domain.TaskmemberDTO;
import com.project.pium.service.TaskmemberService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log
@RestController
@RequestMapping("Tm")
@AllArgsConstructor
public class TaskmemberController {
    TaskmemberService service;

    @GetMapping("TmAll")
    public List<TaskmemberDTO> TmAll() {
        List<TaskmemberDTO> list = service.selectAllS();
        return list;
    }
}
