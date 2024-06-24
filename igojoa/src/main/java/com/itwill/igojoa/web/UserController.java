package com.itwill.igojoa.web;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.dto.user.UserLoginDto;
import com.itwill.igojoa.entity.User;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final S3Service s3Service;

    @GetMapping("/register")
    public String registerForm() {
        return "user/loginRegistration";
    }

    @ResponseBody
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam("userId") String userId,
            @RequestParam("password") String password,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("nickName") String nickName,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            String fileUrl = null;
            if (file != null && !file.isEmpty()) {
                log.info("파일 업로드 시작: {}", file.getOriginalFilename());
                fileUrl = s3Service.uploadFileAndSaveUrl(file, userId);
                log.info("파일 업로드 완료. URL: {}", fileUrl);
            }

            User user = new User(userId, password, email, phoneNumber, nickName, null, fileUrl);
            userService.create(user);

            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            log.error("회원가입 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("회원가입 실패: " + e.getMessage());
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
