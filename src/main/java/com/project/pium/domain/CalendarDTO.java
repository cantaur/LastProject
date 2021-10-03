package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDTO {
    private long calendar_seq;
    private String calendar_title;
    private Date calendar_date;
    private Date calendar_startdate;
    private Date calendar_enddate;
    private long projmember_seq;
    private long project_seq;
}
