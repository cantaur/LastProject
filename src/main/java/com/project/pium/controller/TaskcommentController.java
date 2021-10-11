package com.project.pium.controller;

import com.project.pium.domain.TaskcommentDTO;
import com.project.pium.service.TaskcommentService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Log
@RestController
@AllArgsConstructor
public class TaskcommentController {
    private TaskcommentService taskcommentService;

    //해당 업무를 클릭했을때 오른쪽에서 튀어나오는 업무 상세창의 comment 탭을 눌렀을때 나오는 모든 코멘트를 조회
    @GetMapping("/ajax/taskCmtselect/{taskSeq}")//업무에 따라 분류
    public List<TaskcommentDTO> selectBySeqS(@PathVariable long taskSeq) {
        List<TaskcommentDTO> list = taskcommentService.selectBySeqS(taskSeq);
        return list;
    }

    //코멘트 입력창에서 : content, date, 작성한 사람, task seq, project seq<-필요할지 검증 필요함
    @PostMapping("/ajax/taskCmtinsert")
    public void insertComment(@RequestBody TaskcommentDTO taskcommentDTO) {
        log.info("#Comment insert()" + taskcommentDTO);
        taskcommentService.insertS(taskcommentDTO);
    }

    // task comment isDel 상태로 변경 _ 마일스톤 참고
    @PostMapping("/ajax/taskCmtdelete")
    public void delete(@RequestBody Map<String, Integer> param) {
        Long seq = Long.valueOf(param.get("comment_seq"));
        taskcommentService.deleteS(seq);
    }

    // task comment 수정
    @PostMapping("/ajax/taskCmtupdate")
    public void update(@RequestBody TaskcommentDTO taskcommentDTO) {
        log.info("taskcommentDTO" + taskcommentDTO);
        taskcommentService.updateS(taskcommentDTO);
    }
}

