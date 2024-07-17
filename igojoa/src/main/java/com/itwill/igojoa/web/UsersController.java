package com.itwill.igojoa.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.dto.users.UsersInfoDto;
import com.itwill.igojoa.dto.users.UsersLoginDto;
import com.itwill.igojoa.dto.users.UsersRegisterDto;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.service.PlaceVerifiedService;
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
	private final S3Service s3Service;
	private final PointsService pointsService;
	private final PlaceVerifiedService placeVerifiedService;
	private final UsersService usersService;
	private static final Map<String, Long> userLastLoginTime = new ConcurrentHashMap<>();

	@GetMapping("/loginRegister")
	public String registerForm(Model model, HttpSession session) {
		Object userIdObj = session.getAttribute("userId");
		if (userIdObj != null) {
			int sessionCheck = userService.sessionTorF(userIdObj.toString());
			if (sessionCheck == 1) {
				return "redirect:/";
			}
		}
		String defaultImageUrl = s3Service.getUserProfileDefaultImageUrl();
		model.addAttribute("defaultImageUrl", defaultImageUrl);

		return "user/loginRegistration";
	}

	@Transactional
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
	public ResponseEntity<?> login(@ModelAttribute UsersLoginDto userLoginDto, HttpSession session,
			@RequestParam(name = "target", defaultValue = "") String target) {
		if (userLoginDto.getUserId() == null || userLoginDto.getPassword() == null || userLoginDto.getUserId().isEmpty()
				|| userLoginDto.getPassword().isEmpty()) {
			log.info("아이디와 비밀번호를 입력해주세요");
			return ResponseEntity.ok("redirect:/user/loginRegister?result=fail&target=" + target);
		}
		try {
			Users user = userService.selectByIdAndPassword(userLoginDto.toEntity());
			if (user != null) {
				session.setAttribute("userId", user.getUserId());
				Long loginTime = System.currentTimeMillis();
				userLastLoginTime.put(user.getUserId(), loginTime);
				session.setAttribute("loginTime", loginTime);

				boolean pointsAdded = pointsService.addLoginPoints(user.getUserId());
				Map<String, Object> response = new HashMap<>();
				response.put("success", true);
				response.put("message", "로그인 성공");
				response.put("target", target);
				response.put("pointsMessage", pointsAdded ? "로그인 포인트가 추가되었습니다." : "오늘 이미 로그인 포인트를 받았습니다.");
				return ResponseEntity.ok(response);
			} else {
				return ResponseEntity.ok(Map.of("success", false, "message", "아이디 또는 비밀번호가 일치하지 않습니다."));
			}
		} catch (Exception e) {
			return ResponseEntity.ok(Map.of("success", false, "message", "서버 오류: " + e.getMessage()));
		}
	}

	@GetMapping("/checkSession")
	@ResponseBody
	public ResponseEntity<?> checkSession(HttpSession session) {
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			Long lastLoginTime = userLastLoginTime.get(userId);
			Long sessionLoginTime = (Long) session.getAttribute("loginTime");
			if (lastLoginTime != null && sessionLoginTime != null && lastLoginTime > sessionLoginTime) {
				session.removeAttribute("userId");
				session.removeAttribute("loginTime");
				return ResponseEntity.ok(Map.of("success", false, "message", "다른 곳에서 로그인되어 로그아웃됩니다."));
			}
		}
		return ResponseEntity.ok(Map.of("success", true, "message", "세션 유효"));
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			String userId = (String) session.getAttribute("userId");
			if (userId != null) {
				userLastLoginTime.remove(userId);
				log.info("User {} logged out", userId);
			}
			session.removeAttribute("userId");
		}
		// 메인페이지로 이동
		// return ResponseEntity.ok("redirect:/");
		return ResponseEntity.ok("로그아웃 성공");
	}

	@PostMapping("/findUserId")
	public ResponseEntity<String> findUserId(@RequestParam(name = "email") String email,
			@RequestParam(name = "nickName") String nickName) {
		String userId = userService.findUserId(email, nickName);

		if (userId != null) {
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
	public ResponseEntity<Integer> updatePassword(@RequestParam(name = "userId") String userId,
			@RequestParam(name = "password") String password) {
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

	@Transactional
	@DeleteMapping("/deleteUser")
	public ResponseEntity<String> deleteUser(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		String userId = (String) session.getAttribute("userId");
		userService.deleteUser(userId);
		placeVerifiedService.deletePlaceVerified(userId);
		if (session != null) {
			session.invalidate();
		}
		return ResponseEntity.ok("회원탈퇴 성공");
	}

	@GetMapping("/userProfile")
	public String getUserInfo(HttpSession session, Model model) {
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			model.addAttribute("userProfileUrl", usersService.getUserInfo(userId).getUserProfileUrl());
			model.addAttribute("points", pointsService.selectPoints(userId));
		}
		UsersInfoDto userInfoDto = userService.getUserInfo(userId);
		model.addAttribute("userInfo", userInfoDto);

		return "user/userProfile";
	}

	@PostMapping("/updateProfile")
	@ResponseBody
	public ResponseEntity<?> updateProfile(@RequestBody Users user, HttpSession session) {
		String userId = (String) session.getAttribute("userId");
		user.setUserId(userId);

		boolean updated = userService.updateUsers(user);

		if (updated) {
			return ResponseEntity.ok(Map.of("success", true));
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("success", false, "message", "업데이트를 수행할 수 없습니다."));
		}
	}

	@GetMapping("/getPoints")
	public ResponseEntity<?> getPoints(HttpSession session) {
		if (session.getAttribute("userId") == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("success", false, "message", "로그인 해주세요."));
		}
		String userId = (String) session.getAttribute("userId");
		return ResponseEntity.ok(Map.of("success", true, "points", pointsService.selectPoints(userId),
				"cumulativePoint", usersService.getUserInfo(userId).getCumulativePoint()));
	}

}