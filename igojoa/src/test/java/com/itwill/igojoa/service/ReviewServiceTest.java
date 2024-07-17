package com.itwill.igojoa.service;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.dto.review.ReviewListDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class ReviewServiceTest {
	@Autowired
	private ReviewService reviewService;

	@Test
	public void insertReviewTest() {
		log.debug("insertReviewTest");
		// 리뷰 작성 테스트
		ReviewDto reviews = ReviewDto.builder().placeName("아이티윌").userId("123")
				.review("ㅋㅋㅋ").parkingAvailable(1)
				.view(1).nightView(0).freeEntry(1).easyTransport(1).iscore(3)
				.build();

		List<ReviewListDto> res = reviewService.insertReview(reviews);
		for (ReviewListDto reviewListDto : res) {
			System.out.println("\n\n" + reviewListDto + "\n\n");
		}
	}
}
