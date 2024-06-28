package com.itwill.igojoa.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UsersService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
@RestController
public class UsersUpdateRestController {
	private final UsersService userService;
}
