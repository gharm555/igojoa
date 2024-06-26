package com.itwill.igojoa.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {
	@GetMapping("/")
	public String home(HttpSession httpSession) {
		log.debug("home??");
		// 로그인 세션 값 있는지 확인
		String userId = (String) httpSession.getAttribute("userId");
		System.out.println(userId);
		log.debug(userId);
		// 있을때 실행될 리스트 서비스

		// 없을때 실행될 리스트 서비스

		return "home";
	}
}
