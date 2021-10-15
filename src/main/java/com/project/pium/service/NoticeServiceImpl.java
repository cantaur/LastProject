package com.project.pium.service;

import com.project.pium.domain.NoticeDTO;
import com.project.pium.mapper.NoticeMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private NoticeMapper noticeMapper;


    @Override
    public List<NoticeDTO> selectNoticeS(long projmemberSeq) {
        return noticeMapper.selectNotice(projmemberSeq);
    }

    @Override
    public void mileNoticeS(NoticeDTO noticeDTO){
        noticeMapper.mileNotice(noticeDTO);
    }
    public void taskNoticeS(NoticeDTO noticeDTO) {
        noticeMapper.taskNotice(noticeDTO);
    }

}
