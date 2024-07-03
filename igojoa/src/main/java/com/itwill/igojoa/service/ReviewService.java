package com.itwill.igojoa.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.dto.review.ReviewSelectDto;
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
		ReviewDto reviewDto2;
		if (!optionalReviewDto.isEmpty()) {
			reviewDto2 = optionalReviewDto.get();
		} else {

			return new ArrayList<>();
		}
		Reviews reviews = reviewDto.toEntity(reviewDto2);
		int i = reviewDao.insertReview(reviews);
		int j = pointsDao.addLoginPoints(reviewDto2.getUserId(), 500);
		int k = pointsDao.insertPointLog(reviewDto2.getUserId(), "리뷰작성", 500);
		if (i == 1 && j == 1 && k == 1) {
			ReviewSelectDto reviewSelectDto = ReviewSelectDto.builder().placeName(reviewDto2.getPlaceName())
					.userId(reviewDto2.getUserId()).orderBy("modifiedAtDESC").startRowValue(0).rowCnt(8).build();
			List<ReviewListDto> res = reviewDao.selectPlaceReviews(reviewSelectDto);

			return res;
		} else {

			return new ArrayList<>();
		}
	}

	@Transactional
	public List<ReviewListDto> selectReview(ReviewSelectDto reviewSelectDto) {
		List<ReviewListDto> reviewListDtos = reviewDao.selectPlaceReviews(reviewSelectDto);

		return reviewListDtos;
	}
}
