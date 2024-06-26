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

import com.itwill.igojoa.dto.Userss.UserssLoginDto;
import com.itwill.igojoa.dto.Userss.UserssRegisterDto;
import com.itwill.igojoa.entity.Userss;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UserssService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/Users")
@Slf4j
public class UserssController {

    private final UserssService UsersService;
    private final S3Service s3Service;

    @GetMapping("/register")
    public String registerForm(Model model) {
        String defaultImageUrl = s3Service.getUsersProfileDefaultImageUrl();
        model.addAttribute("defaultImageUrl", defaultImageUrl);
        return "Users/loginRegistration";
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@ModelAttribute UserssRegisterDto UsersRegisterDto) throws IOException {

        try {
            Userss Users = Userss.builder()
                    .UsersId(UsersRegisterDto.getUsersId())
                    .password(UsersRegisterDto.getPassword())
                    .email(UsersRegisterDto.getEmail())
                    .phoneNumber(UsersRegisterDto.getPhoneNumber())
                    .nickName(UsersRegisterDto.getNickName())
                    .build();
            if (UsersRegisterDto.getFile() != null && !UsersRegisterDto.getFile().isEmpty()) {
                log.info("파일 업로드 시작: {}", UsersRegisterDto.getFile().getOriginalFilename());
                Users = s3Service.uploadImage(UsersRegisterDto.getFile(), Users);
                log.info("파일 업로드 완료. URL: {}", Users.getUsersProfileUrl());
            }
            UsersService.create(Users);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            log.error("회원가입 중 오류 발생", e);
            return ResponseEntity.status(500).body("회원가입 실패: " + e.getMessage());
        }
    }

    @GetMapping("/login")
    public String loginForm() {
        return "Users/loginRegistration";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute UserssLoginDto UsersLoginDto, HttpSession session) {
        if (UsersLoginDto.getUsersId() == null || UsersLoginDto.getPassword() == null) {
            log.info("아이디와 비밀번호를 입력해주세요");
            return "redirect:/Users/login";
        }
        try {
            Userss Users = UsersService.selectByIdAndPassword(UsersLoginDto.toEntity());
            if (Users != null) {
                session.setAttribute("UsersId", Users.getUsersId());
                return "redirect:/";
            } else {
                return "redirect:/Users/login";
            }
        } catch (Exception e) {
            return "redirect:/Users/login";
        }
    }
}
