package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectmemberDTO {
    private long projmember_seq;
    private String projmember_type;
    private String projmember_name;
    private String projmember_image;
    private long project_seq;
    private long member_seq;

}
