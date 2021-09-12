package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskmemberDTO {
    private long taskmember_seq;
    private long task_seq;
    private long projmember_seq;

}
