package com.project.pium.controller;


import com.project.pium.domain.NoticeDTO;
import com.project.pium.service.NoticeService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log
@RestController
@AllArgsConstructor
public class NoticeController {
    private NoticeService noticeService;

    @GetMapping("ajax/notice/{projmemberSeq}")
    public List<NoticeDTO> notice(@PathVariable long projmemberSeq){
        return noticeService.selectNoticeS(projmemberSeq);

    }

}
