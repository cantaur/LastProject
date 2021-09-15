package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalenderDTO {
    private long calender_seq;
    private String calender_title;
    private String calender_content;
    private Date calender_date;
    private Date calender_startdate;
    private Date calender_enddate;
    private long projmember_seq;
}
