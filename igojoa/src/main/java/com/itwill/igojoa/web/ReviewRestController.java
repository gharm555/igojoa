package com.itwill.igojoa.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.service.PlaceVerifiedService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewRestController {
	private final HttpSession session;
	private final PlaceVerifiedService placeVerifiedService;

	@PutMapping("/{placeName}/newReview")
	public ResponseEntity<Integer> newReview(@PathVariable String placeName) {
		// 방문인증 검증
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
//		if (userId != null) {
//			int sessionCheck = usersService.sessionTorF(userId);
//			if (sessionCheck == 0) {
//
//				return ResponseEntity.badRequest().body(0);
//			}
//		}
		userId = "김진성"; // 테스트 코드
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		int res = placeVerifiedService.visitVerificationConfirmation(placesFavoriteDto);
		
		return ResponseEntity.ok(res);
	}
}
