package com.itwill.igojoa.web;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itwill.igojoa.dto.users.UsersLoginDto;
import com.itwill.igojoa.dto.users.UsersRegisterDto;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UsersController {

    private final UsersService userService;
    private final S3Service s3Service;

    @GetMapping("/loginRegister")
    public String registerForm(Model model) {
        String defaultImageUrl = s3Service.getUserProfileDefaultImageUrl();
        model.addAttribute("defaultImageUrl", defaultImageUrl);
        return "user/loginRegistration";
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@ModelAttribute UsersRegisterDto userRegisterDto) throws IOException {

        try {
            Users user = Users.builder()
                    .userId(userRegisterDto.getUserId())
                    .password(userRegisterDto.getPassword())
                    .email(userRegisterDto.getEmail())
                    .phoneNumber(userRegisterDto.getPhoneNumber())
                    .nickName(userRegisterDto.getNickName())
                    .build();
            if (userRegisterDto.getFile() != null && !userRegisterDto.getFile().isEmpty()) {
                log.info("파일 업로드 시작: {}", userRegisterDto.getFile().getOriginalFilename());
                user = s3Service.uploadImage(userRegisterDto.getFile(), user);
                log.info("파일 업로드 완료. URL: {}", user.getUserProfileUrl());
            }
            userService.create(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            log.error("회원가입 중 오류 발생", e);
            return ResponseEntity.status(500).body("회원가입 실패: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public String login(@ModelAttribute UsersLoginDto userLoginDto, HttpSession session) {
        if (userLoginDto.getUserId() == null || userLoginDto.getPassword() == null) {
            log.info("아이디와 비밀번호를 입력해주세요");
            return "redirect:/user/login";
        }
        try {
            Users user = userService.selectByIdAndPassword(userLoginDto.toEntity());
            if (user != null) {
                session.setAttribute("userId", user.getUserId());
                return "redirect:/";
            } else {
                return "redirect:/user/login";
            }
        } catch (Exception e) {
            return "redirect:/user/login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) {
            session.removeAttribute("userId");
        }
        return "redirect:/";
    }
}
