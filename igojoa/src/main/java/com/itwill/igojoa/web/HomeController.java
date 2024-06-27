package com.itwill.igojoa.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {
<<<<<<< HEAD
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
=======
    @GetMapping("/")
    public String home(HttpSession session) {
        log.debug("home");
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            System.out.println("세션에 저장된 아이디가 없습니다.");
        }
        System.out.println("세션에 저장된 아이디: " + userId);
        return "home";
    }
>>>>>>> 9b875e85cd97a4a96ca0c2c198ca4a12ab3f7f3a
}
