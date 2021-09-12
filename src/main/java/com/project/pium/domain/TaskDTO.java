package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private long task_seq;
    private String task_title;
    private String task_content;
    private String task_status;
    private String task_isdelete;
    private Date task_startdate;
    private Date task_duedate;
    private Date task_enddate;
    private long milestone_seq;
    private String priority_code;
    private long label_seq;

}
