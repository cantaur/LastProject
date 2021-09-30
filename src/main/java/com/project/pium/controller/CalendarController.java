package com.project.pium.controller;

import com.project.pium.domain.CalendarDTO;
import com.project.pium.domain.ProjectDTO;
import com.project.pium.service.CalendarService;
import com.project.pium.service.MemberService;
import com.project.pium.service.ProjectService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Log
@RestController
@RequestMapping("calendar")
@AllArgsConstructor
public class CalendarController {

    private CalendarService calendarService;
    private ProjectService projectService;
    private MemberService memberService;

    //현재 로그인한 유저의 세션값 얻어오는 로직 모듈화
    public String currentUserName(Principal principal){
        if(principal ==null){
            return "false";
        }else{
            String sessionEmail = principal.getName();
            return sessionEmail;
        }
    }

    //새 달력 MEMO 만들기
    @PostMapping("/ajax/test5")
    public List<CalendarDTO> insertCalMemo (@RequestBody CalendarDTO calendarDTO, Principal principal) {
        String email = currentUserName(principal);
        long sessionSeq = memberService.findUserNo(email);
        calendarDTO.setCalendar_seq(sessionSeq);

        List<CalendarDTO> msg = calendarService.insertCalMemo(calendarDTO);
        log.info("#: " + msg);
        return msg;

    }


    // 새 달력 MEMO 수정하기


    // 새 달력 MEMO 삭제하기

    // 로그인한 유저가 참여 중인 모든 프로젝트 리스트 찍기
    @GetMapping("/ajax/LoginProjectAll")
    public List<ProjectDTO> myProject(Principal principal){
        String  email = currentUserName(principal);
        long sessionSeq=memberService.findUserNo(email);
        List<ProjectDTO> myProject = projectService.myProject(sessionSeq);
        log.info("#myProject"+myProject);
        return myProject;
    }

    //http://127.0.0.1:8000/project/ajax/LoginProjectAll

   // 로그인한 유저가 선택한 프로젝트 리스트 찍기
    @GetMapping("/ajax/")

    //달력 입력
    @PostMapping("createCal")
    public void createCal(@RequestBody CalendarDTO calendarDTO) {
        log.info("calendar create() : " + calendarDTO);
        calendarService.creatCal(calendarDTO);
    }

    /*
     at Talend API Tester
     method : post
     http://localhost:8000/calendar/createCal
     d
     Response 200 코드 확인 완료
     */

    //달력 list 조회
    @GetMapping("calList")
    public List<CalendarDTO> calList() {
        List<CalendarDTO> calList = calendarService.calList();
        return calList;
    }
    //http://localhost:8000/calendar/calList

    //달력 list seq 조회
    @GetMapping("calList/{calSeq}")
    public List<CalendarDTO> calList(@PathVariable long calSeq){
        List<CalendarDTO> calList = calendarService.calListBySeq(calSeq);
        log.info("calList" + calList);
        return calList;
    }
    //http://localhost:8000/calendar/calList/1

    //달력 list byProSeq 조회
    @GetMapping("calListPro/{calProSeq}")
    public List<CalendarDTO> calListPro(@PathVariable long calProSeq){
        List<CalendarDTO> calListPro = calendarService.calListByProSeq(calProSeq);
        log.info("calListPro" + calProSeq);
        return calListPro;
    }
    //http://localhost:8000/calendar/calListPro/1

    //달력 title 수정
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

