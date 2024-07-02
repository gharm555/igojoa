package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.service.PlaceVerifiedService;
import com.itwill.igojoa.service.ReviewService;
import com.itwill.igojoa.service.UsersService;

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
	private final UsersService usersService;

	@PutMapping("/{placeName}/newReview")
	public ResponseEntity<?> newReview(@PathVariable String placeName,
			@RequestBody ReviewDto reviewDto) {
		// 방문인증 검증
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {

				return ResponseEntity.badRequest().body(-1);
			}
		}
		userId = "김진성"; // 테스트 코드
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		int i = placeVerifiedService.visitVerificationConfirmation(placesFavoriteDto);
		if (i == 0) {
			// 방문 기록 없음
			return ResponseEntity.ok(0);
		} else {
			reviewDto.setPlaceName(placeName);
			reviewDto.setUserId(userId);
			log.debug("\n\n" + reviewDto.toString() + "\n\n");
			List<ReviewListDto> res = reviewService.insertReview(reviewDto);

			return ResponseEntity.ok(res);
		}
	}

}
