package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDTO {
    private long notice_seq;
    private String notcie_type;
    private Date notice_date;
    private String notice_status;
    private long notice_sender;
    private long task_seq;
    private long milestone_seq;
    private long projmember_seq;

}
