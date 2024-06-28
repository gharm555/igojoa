package com.itwill.igojoa.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.itwill.igojoa.dto.users.UsersInfoDto;
import com.itwill.igojoa.dto.users.UsersLoginDto;
import com.itwill.igojoa.dto.users.UsersRegisterDto;
import com.itwill.igojoa.entity.Points;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UsersController {

	private final UsersService userService;
	private final PointsService pointsService;
	private final S3Service s3Service;

	@GetMapping("/userProfile")
	public String getUserInfo(HttpSession session, Model model) {
		String userId = (String) session.getAttribute("userId");

		Users user = userService.getUserInfo(userId);
		Points points = pointsService.getPointsByUserId(userId);
		UsersInfoDto result = UsersInfoDto.fromEntity(user, points);
		// 개인마다 다른 정보는 session에 저장하는게 맞다 - advice
		session.setAttribute("userProfileUrl", user.getUserProfileUrl());
		session.setAttribute("nickName", user.getNickName());
		session.setAttribute("currentsPoints", points.getCurrentsPoints());
		
		model.addAttribute("userInfo", result);

		return "user/userProfile";
	}

	@GetMapping("/loginRegister")
	public String registerForm(Model model, HttpSession session) {
		String defaultImageUrl = s3Service.getUserProfileDefaultImageUrl();
		model.addAttribute("defaultImageUrl", defaultImageUrl);
		// if (session.getAttribute("userId") != null) {
		// return "redirect:/";
		// }
		return "user/loginRegistration";
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@ModelAttribute UsersRegisterDto userRegisterDto) throws IOException {
		String phoneNumber = userRegisterDto.getPhone1() + userRegisterDto.getPhone2() + userRegisterDto.getPhone3();
		try {
			Users user = Users.builder().userId(userRegisterDto.getUserId()).password(userRegisterDto.getPassword())
					.email(userRegisterDto.getEmail()).phoneNumber(phoneNumber).nickName(userRegisterDto.getNickName())
					.build();
			log.info("파일 업로드 시작: {}", userRegisterDto.getFile().getOriginalFilename());
			user = s3Service.uploadImage(userRegisterDto.getFile(), user);
			log.info("파일 업로드 완료. URL: {}", user.getUserProfileUrl());

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
				session.setAttribute("userProfileUrl", user.getUserProfileUrl());
				return "redirect:/";
			} else {
				return "redirect:/user/loginRegister";
			}
		} catch (Exception e) {
			return "redirect:/user/loginRegister";
		}
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.removeAttribute("userId");
			session.removeAttribute("userProfileUrl");
		}
		return ResponseEntity.ok("로그아웃 성공");
	}

	@PostMapping("/findUserId")
	public ResponseEntity<String> findUserId(@RequestParam(name = "email") String email,
			@RequestParam(name = "nickName") String nickName) {
		String userId = userService.findUserId(email, nickName);

		if (userId != null && !userId.isEmpty()) {
			return ResponseEntity.ok(userId);
		} else {
			return ResponseEntity.ok("입력하신 정보를 확인해 주세요.");
		}
	}

	@PostMapping("/verifyUser")
	public ResponseEntity<Boolean> verifyUser(@RequestParam(name = "userId") String userId,
			@RequestParam(name = "email") String email, @RequestParam(name = "nickName") String nickName) {
		boolean isVerified = userService.verifyUser(userId, email, nickName);
		return ResponseEntity.ok(isVerified ? true : false);
	}

	@PostMapping("/updatePassword")
	public ResponseEntity<Integer> updatePassword(@RequestParam String userId, @RequestParam String password) {
		int result = userService.updatePassword(userId, password);
		if (result == 1) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.ok(0);
		}
	}

	@GetMapping("/checkUserId")
	public ResponseEntity<Boolean> checkUserId(@RequestParam(name = "userId") String userId) {
		boolean isExist = userService.checkUserId(userId);
		return ResponseEntity.ok(!isExist ? true : false);
	}

	@GetMapping("/checkNickName")
	public ResponseEntity<Boolean> checkNickName(@RequestParam(name = "nickName") String nickName) {
		boolean isExist = userService.checkNickName(nickName);
		return ResponseEntity.ok(!isExist ? true : false);
	}

	@GetMapping("/checkEmail")
	public ResponseEntity<Boolean> checkEmail(@RequestParam(name = "email") String email) {
		boolean isExist = userService.checkEmail(email);
		return ResponseEntity.ok(!isExist ? true : false);
	}

	@GetMapping("/checkPhoneNumber")
	public ResponseEntity<Boolean> checkPhoneNumber(@RequestParam(name = "phone1") String phone1,
			@RequestParam(name = "phone2") String phone2, @RequestParam(name = "phone3") String phone3) {
		String phoneNumber = phone1 + phone2 + phone3;
		boolean isExist = userService.checkPhoneNumber(phoneNumber);
		return ResponseEntity.ok(!isExist ? true : false);
	}

}
