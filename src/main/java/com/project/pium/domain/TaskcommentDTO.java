package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskcommentDTO {
    private long comment_seq;
    private String comment_content;
    private String comment_isdelete;
    private Date comment_date;
    private long task_seq;
    private long projmember_seq;

}
