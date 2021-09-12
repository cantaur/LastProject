package com.project.pium.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileDTO {
    private long file_seq;
    private String file_savename;
    private String file_originname;
    private Date file_uploaddate;
    private String file_size;
    private String file_extension;
    private String file_isdelete;
    private long projmember_seq;
    private long task_seq;

}
