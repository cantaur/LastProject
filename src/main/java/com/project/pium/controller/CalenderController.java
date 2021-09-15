package com.project.pium.controller;

import com.project.pium.domain.CalenderDTO;
import com.project.pium.service.CalenderService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@Log
@RestController
@RequestMapping("calender")
@AllArgsConstructor
public class CalenderController {

    private CalenderService calenderService;
    //달력 입력
    @PostMapping("createCal")
    public void createCal(@RequestBody CalenderDTO calenderDTO) {
        log.info("calender create() : " + calenderDTO);
        calenderService.creatCal(calenderDTO);
    }

    /*
     at Talend API Tester
     method : post
     http://localhost:8000/calender/createCal
     {
    	"calender_title": "달력 TEST",
    	"calender_content": "달력 TEST 내용",
    	"calender_date" : "2021-09-15 T07:25:15.130+00:00",
    	"calender_startdate" : "2021-09-15 T07:25:15.130+00:00",
    	"calender_enddate" : "2021-09-15 T07:25:15.130+00:00",
    	"projmember_seq": "1"
    	}
     Response 200 코드 확인 완료
     */

    //달력 list 조회
    @GetMapping("calList")
    public List<CalenderDTO> calList() {
        List<CalenderDTO> calList = calenderService.calList();
        return calList;
    }
    //http://localhost:8000/calender/calList

    //달력 list seq 조회
    @GetMapping("calList/{calSeq}")
    public List<CalenderDTO> calList(@PathVariable long calSeq){
        List<CalenderDTO> calList = calenderService.calListBySeq(calSeq);
        log.info("calList" + calList);
        return calList;
    }
    //http://localhost:8000/calender/calList/1

    //달력 list byProSeq 조회
    @GetMapping("calListPro/{calProSeq}")
    public List<CalenderDTO> calListPro(@PathVariable long calProSeq){
        List<CalenderDTO> calListPro = calenderService.calListByProSeq(calProSeq);
        log.info("calListPro" + calProSeq);
        return calListPro;
    }
    //http://localhost:8000/calender/calListPro/1

    //달력 title 수정
    @PutMapping("upCalName")
    public void upCalName(@RequestBody CalenderDTO calenderDTO){
        calenderService.upCalName(calenderDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calender/upCalName
      {"calender_title":"달력 REre1","calender_seq":18}
    */

    //달력 내용 수정
    @PutMapping("upCalContent")
    public void upCalContent(@RequestBody CalenderDTO calenderDTO){
        calenderService.upCalContent(calenderDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calender/upCalContent
      {"calender_content":"RE 달력 TEST 내용","calender_seq":18}
    */

    //달력 날짜 수정
    @PutMapping("upCalDate")
    public void upCalDate(@RequestBody CalenderDTO calenderDTO){
        calenderService.upCalDate(calenderDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calender/upCalDate
      {"calender_date":"2021-09-01","calender_seq":18}
    */

    //달력 start날짜 수정
    @PutMapping("upCalSdate")
    public void upCalSdate(@RequestBody CalenderDTO calenderDTO){
        calenderService.upCalSdate(calenderDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calender/upCalSdate
      {"calender_startdate":"2021-09-01","calender_seq":18}
    */

    //달력 end날짜 수정
    @PutMapping("upCalEdate")
    public void upCalEdate(@RequestBody CalenderDTO calenderDTO){
        calenderService.upCalEdate(calenderDTO);
    }
     /*at Talend API Tester
      method : put
      url : http://localhost:8000/calender/upCalEdate
      {"calender_enddate":"2021-09-01","calender_seq":18}
    */

    //달력 seq 삭제
    @DeleteMapping("delCal/{calSeq}")
    public void delCal(@PathVariable long calSeq){
        calenderService.delCal(calSeq);
    }
     /*at Talend API Tester
      method : del
      url : http://localhost:8000/calender/delCal/19
    */
}

