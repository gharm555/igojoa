package com.itwill.igojoa.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {

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
}
