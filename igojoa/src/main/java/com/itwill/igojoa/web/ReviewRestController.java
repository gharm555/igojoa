package com.itwill.igojoa.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.service.PlaceVerifiedService;
import com.itwill.igojoa.service.ReviewService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewRestController {
	private final HttpSession session;
	private final PlaceVerifiedService placeVerifiedService;
	private final ReviewService reviewService;

	@PutMapping("/{placeName}/newReview")
	public ResponseEntity<Integer> newReview(@PathVariable String placeName, @RequestBody ReviewDto reviewDto) {
		// 방문인증 검증
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		// if (userId != null) {
		// int sessionCheck = usersService.sessionTorF(userId);
		// if (sessionCheck == 0) {
		//
		// return ResponseEntity.badRequest().body(0);
		// }
		// }
		userId = "김진성"; // 테스트 코드
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		int res = placeVerifiedService.visitVerificationConfirmation(placesFavoriteDto);
		if (res == 0) {

			return ResponseEntity.ok(res);
		} else {
			log.debug("\n\n" + reviewDto.toString() + "\n\n");
			int i = reviewService.insertReview();

			return ResponseEntity.ok(i);
		}
	}

}
