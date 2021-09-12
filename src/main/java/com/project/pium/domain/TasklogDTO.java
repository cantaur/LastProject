package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TasklogDTO {
    private long tasklog_seq;
    private String tasklog_type;
    private Date tasklog_date;
    private long task_seq;
    private long projmember_seq;

}
