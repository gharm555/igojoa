package com.itwill.igojoa.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.itwill.igojoa.dto.place.PlaceDetailDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.PlaceVerifiedService;
import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {
	private final HttpSession session;
	private final PlaceVerifiedService placeVerifiedService;
	private final PlaceService placeService;
	private final PointsService pointsService;
	private final UsersService usersService;

	@Transactional
	@PostMapping("/verifyLocation")
	public ResponseEntity<String> verifyPlace(@RequestParam(name = "latitude") double latitude,
			@RequestParam(name = "longitude") double longitude) {
		String userId = (String) session.getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.badRequest().body("로그인 해주세요");
		}
		String isVerified = placeVerifiedService.verifyUserLocation(latitude, longitude, userId);
		if (isVerified.equals("위치 인증 성공")) {
			pointsService.addPlaceVerifiedPoints(userId);
			pointsService.insertPointLog(userId, "위치인증", 1000);
			return ResponseEntity.ok(isVerified);
		} else if (isVerified.equals("이미 위치 인증 한 장소입니다.")) {
			return ResponseEntity.ok(isVerified);
		} else {
			return ResponseEntity.badRequest().body(isVerified);
		}
	}

	@GetMapping("/details/{placeName}")
	public String placeDetailPage(@PathVariable String placeName, Model model) {
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			model.addAttribute("userProfileUrl", usersService.getUserInfo(userId).getUserProfileUrl());
			model.addAttribute("points", pointsService.selectPoints(userId));
			if (sessionCheck == 0) {

				return "redirect:/";
			}
		}
		// userId = "오진호"; // 테스트 코드
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		PlaceDetailDto res = placeService.selectPlaceDetail(placesFavoriteDto);
		model.addAttribute("PlaceDetailDto", res);

		return "/place/placeDetail";
	}
}
