package com.itwill.igojoa.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itwill.igojoa.dto.UserLoginDto;
import com.itwill.igojoa.entity.User;
import com.itwill.igojoa.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/register")
    public String registerForm() {
        return "user/register";
    }

    @ResponseBody
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            userService.create(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("회원가입 실패");
        }

    }

    @GetMapping("/login")
    public String loginForm() {
        return "user/login";
    }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto, HttpSession session) {
        if (userLoginDto.getUserId() == null || userLoginDto.getPassword() == null) {
            return ResponseEntity.status(400).body("아이디와 비밀번호를 입력해주세요");
        }
        try {
            User user = userService.selectByIdAndPassword(userLoginDto.toEntity());
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
