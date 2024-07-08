package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.dto.review.ReviewLikeDto;
import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.dto.review.ReviewSelectDto;
import com.itwill.igojoa.service.PlaceVerifiedService;
import com.itwill.igojoa.service.ReviewService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/{placeName}")
@RequiredArgsConstructor
public class ReviewRestController {
	private final HttpSession session;
	private final PlaceVerifiedService placeVerifiedService;
	private final ReviewService reviewService;
	private final UsersService usersService;

	@PutMapping("/newReview")
	public ResponseEntity<?> newReview(@PathVariable String placeName, @RequestBody ReviewDto reviewDto) {
		// 방문인증 검증
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {

				return ResponseEntity.badRequest().body(-1);
			}
		}
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

	@PutMapping("/updateReview")
	public ResponseEntity<?> updateReview(@PathVariable String placeName, @RequestBody ReviewDto reviewDto) {
		log.debug("\n\n" + reviewDto.toString() + "\n\n");
		String userId = (String) session.getAttribute("userId");

		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {

				return ResponseEntity.badRequest().body(-1);
			}
		}
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		int i = placeVerifiedService.visitVerificationConfirmation(placesFavoriteDto);
		if (i == 0) {
			// 방문 기록 없음
			return ResponseEntity.ok(0);
		} else {
			reviewDto.setPlaceName(placeName);
			reviewDto.setUserId(userId);
			log.debug("\n\n" + reviewDto.toString() + "\n\n");
			List<ReviewListDto> res = reviewService.updateReview(reviewDto);

			return ResponseEntity.ok(res);
		}
	}

	@DeleteMapping("/deleteReview")
	public ResponseEntity<?> deleteReview(@PathVariable String placeName) {
		String userId = (String) session.getAttribute("userId");

		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {

				return ResponseEntity.badRequest().body(-1);
			}
		}
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		List<ReviewListDto> res = reviewService.deleteReview(placesFavoriteDto);
		
		return ResponseEntity.ok(res);
	}

	@GetMapping("/selectDefaultReview")
	public ResponseEntity<List<ReviewListDto>> selectDefaultReview(@PathVariable String placeName) {
		String userId = (String) session.getAttribute("userId");
		ReviewSelectDto reviewSelectDto = ReviewSelectDto.builder().placeName(placeName).userId(userId)
				.orderBy("cntLikeDESC").startRowValue(0).rowCnt(8).build();
		List<ReviewListDto> reviewListDtos = reviewService.selectReview(reviewSelectDto);

		return ResponseEntity.ok(reviewListDtos);
	}

	@GetMapping("/sortReview")
	public ResponseEntity<List<ReviewListDto>> sortReview(@PathVariable String placeName,
			@ModelAttribute ReviewSelectDto reviewSelectDto) {
		String userId = (String) session.getAttribute("userId");
		reviewSelectDto.setPlaceName(placeName);
		reviewSelectDto.setUserId(userId);
		List<ReviewListDto> reviewListDtos = reviewService.selectReview(reviewSelectDto);

		return ResponseEntity.ok(reviewListDtos);
	}

	@PutMapping("/clickReviewLike")
	public ResponseEntity<Integer> clickReviewLike(@PathVariable String placeName, @RequestBody String userId) {
		String likeUserId = (String) session.getAttribute("userId");

		if (likeUserId == null) {
			return ResponseEntity.ok(0);
		}
		ReviewLikeDto reviewLikeDto = ReviewLikeDto.builder().userId(userId).placeName(placeName).likeUserId(likeUserId)
				.build();
		int res = reviewService.clickReviewLike(reviewLikeDto);
		
		return ResponseEntity.ok(res);
	}

	@DeleteMapping("/deleteReviewLike")
	public ResponseEntity<Integer> deleteReviewLike(@PathVariable String placeName,
			@RequestParam("userId") String userId) {
		String likeUserId = (String) session.getAttribute("userId");

		if (likeUserId == null) {
			return ResponseEntity.ok(0);
		}
		ReviewLikeDto reviewLikeDto = ReviewLikeDto.builder().userId(userId).placeName(placeName).likeUserId(likeUserId)
				.build();
		int res = reviewService.deleteReviewLike(reviewLikeDto);

		return ResponseEntity.ok(res);
	}

}
