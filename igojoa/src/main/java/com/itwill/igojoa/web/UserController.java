package com.itwill.igojoa.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.dto.user.UserLoginDto;
import com.itwill.igojoa.entity.User;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final S3Service s3Service;

    @GetMapping("/register")
    public String registerForm() {
        return "user/loginRegistration";
    }

    @ResponseBody
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam(name = "userId") String userId,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "email") String email,
            @RequestParam(name = "phoneNumber") String phoneNumber,
            @RequestParam(name = "nickName") String nickName,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        System.out.println("userId: " + userId);
        System.out.println("password: " + password);
        System.out.println("email: " + email);
        System.out.println("phoneNumber: " + phoneNumber);
        System.out.println("nickName: " + nickName);
        System.out.println("file: " + file);
        User user = User.builder()
                .userId(userId)
                .password(password)
                .email(email)
                .phoneNumber(phoneNumber)
                .nickName(nickName)
                .build();
        try {
            if (file != null && !file.isEmpty()) {
                String fileUrl = s3Service.uploadFileAndSaveUrl(file, user.getUserId());
                user.setUserProfileUrl(fileUrl);
                user.setUserProfileName(file.getOriginalFilename());
            }
            userService.create(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
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
            if (user != null) {
                session.setAttribute("user", user);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(400).body("로그인 실패: 사용자 정보가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
