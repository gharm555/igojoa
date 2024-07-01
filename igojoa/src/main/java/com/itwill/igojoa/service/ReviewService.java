package com.itwill.igojoa.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.entity.Reviews;
import com.itwill.igojoa.repository.ReviewDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewDao reviewDao;

	@Transactional
	public int insertReview(ReviewDto reviewDto) {
		log.debug("insertReview()");
		Optional<ReviewDto> optionalReviewDto = Optional.ofNullable(reviewDto);
		ReviewDto dto;
		if (!optionalReviewDto.isEmpty()) {
			dto = optionalReviewDto.get();
		} else {
			dto = new ReviewDto();
		}
		Reviews reviews = reviewDto.toEntity(dto);
		int res = reviewDao.insertReview(reviews);
		
		return res;
	}

}
