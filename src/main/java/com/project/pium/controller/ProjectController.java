package com.project.pium.controller;

import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 로그인 이후..
 * 내가 참여한 프로젝트 리스트 호출,
 * 프로젝트 생성, 프로젝트 보관 및 복원 등 처리
 * 
 */

@Log
@RestController
@RequestMapping("projects") 
@AllArgsConstructor
public class ProjectController {
}
