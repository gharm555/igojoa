package com.itwill.igojoa.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.entity.Reviews;
import com.itwill.igojoa.repository.PointsDao;
import com.itwill.igojoa.repository.ReviewDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewDao reviewDao;
	private final PointsDao pointsDao;

	@Transactional
	public List<ReviewListDto> insertReview(ReviewDto reviewDto) {
		log.debug("insertReview()");
		Optional<ReviewDto> optionalReviewDto = Optional.ofNullable(reviewDto);
		ReviewDto dto;
		if (!optionalReviewDto.isEmpty()) {
			dto = optionalReviewDto.get();
		} else {
			dto = new ReviewDto();
		}
		Reviews reviews = reviewDto.toEntity(dto);
		int i = reviewDao.insertReview(reviews);
		int j = pointsDao.addLoginPoints(dto.getUserId(), 500);
		int k = pointsDao.insertPointLog(dto.getUserId(), "리뷰작성", 500);
		if (i == 1 && j == 1 && k == 1) {
			List<ReviewListDto> res = reviewDao.selectPlaceReviews(dto.getPlaceName());

			return res;
		} else {

			return new ArrayList<>();
		}
	}
}
