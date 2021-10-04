package com.project.pium.controller;

import com.project.pium.domain.CalendarDTO;
import com.project.pium.domain.TaskDTO;
import com.project.pium.service.CalendarService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Log
@RestController
@AllArgsConstructor
@ResponseBody
public class CalendarController {

    private CalendarService calendarService;


    //새 달력 MEMO 만들기
    @PostMapping("/ajax/createCal")
    public void insertCalMemo (@RequestBody CalendarDTO calendarDTO) {
        log.info("캘린더dto"+calendarDTO);
        calendarService.insertCalMemo(calendarDTO);
    }

    //이 프로젝트에서 생성한 모든 캘린더 리스트 조회, 이 프로젝트의 모든 업무 조회
    @GetMapping("/ajax/calList/{projSeq}")
    public ArrayList<Object> calListPro(@PathVariable long projSeq){
        ArrayList<Object> calList = new ArrayList<>();
        LinkedHashMap<String,Object> tempCal = new LinkedHashMap<>();

        List<CalendarDTO> calListProj = calendarService.calListByProjSeq(projSeq); //캘린더 리스트
        List<TaskDTO> taskListProj = calendarService.taskListByProjSeq(projSeq); //업무 리스트 조회

        tempCal.put("calListProj", calListProj);
        tempCal.put("taskListProj", taskListProj);

        calList.add(tempCal);
        log.info("#calList : "+calList);

        return calList;
    }


    @PutMapping("upCalName")
    public void upCalName(@RequestBody CalendarDTO calendarDTO){
        calendarService.upCalName(calendarDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calendar/upCalName
      {"calendar_title":"달력 REre1","calendar_seq":18}
    */

    //달력 내용 수정
    @PutMapping("upCalContent")
    public void upCalContent(@RequestBody CalendarDTO calendarDTO){
        calendarService.upCalContent(calendarDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calendar/upCalContent
      {"calendar_content":"RE 달력 TEST 내용","calendar_seq":18}
    */

    //달력 날짜 수정
    @PutMapping("upCalDate")
    public void upCalDate(@RequestBody CalendarDTO calendarDTO){
        calendarService.upCalDate(calendarDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calendar/upCalDate
      {"calendar_date":"2021-09-01","calendar_seq":18}
    */

    //달력 start날짜 수정
    @PutMapping("upCalSdate")
    public void upCalSdate(@RequestBody CalendarDTO calendarDTO){
        calendarService.upCalSdate(calendarDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calendar/upCalSdate
      {"calendar_startdate":"2021-09-01","calendar_seq":18}
    */

    //달력 end날짜 수정
    @PutMapping("upCalEdate")
    public void upCalEdate(@RequestBody CalendarDTO calendarDTO){
        calendarService.upCalEdate(calendarDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calendar/upCalEdate
      {"calendar_enddate":"2021-09-01","calendar_seq":18}
    */

    //달력 seq 삭제
    @DeleteMapping("delCal/{calSeq}")
    public void delCal(@PathVariable long calSeq){
        calendarService.delCal(calSeq);
    }
     /*at Talend API Tester
      method : del
      url : http://localhost:8000/calendar/delCal/19
    */
}

