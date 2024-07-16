package com.itwill.igojoa.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.dto.review.ReviewDto;
import com.itwill.igojoa.dto.review.ReviewLikeDto;
import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.dto.review.ReviewSelectDto;
import com.itwill.igojoa.entity.ReviewLikes;
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
			Optional<List<ReviewListDto>> optionalReviewListDto = Optional
					.ofNullable(reviewDao.selectPlaceReviews(reviewSelectDto));
			List<ReviewListDto> res;
			if (!optionalReviewListDto.isEmpty()) {
				res = optionalReviewListDto.get();
			} else {
				res = new ArrayList<>();
			}

			return res;
		} else {

			return new ArrayList<>();
		}
	}

	@Transactional
	public List<ReviewListDto> updateReview(ReviewDto reviewDto) {
		Optional<ReviewDto> optionalReviewDto = Optional.ofNullable(reviewDto);
		ReviewDto reviewDto2;
		if (!optionalReviewDto.isEmpty()) {
			reviewDto2 = optionalReviewDto.get();
		} else {

			return new ArrayList<>();
		}
		Reviews reviews = reviewDto.toEntity(reviewDto2);
		int i = reviewDao.updateReview(reviews);
		if (i == 1) {
			ReviewSelectDto reviewSelectDto = ReviewSelectDto.builder().placeName(reviewDto2.getPlaceName())
					.userId(reviewDto2.getUserId()).orderBy("modifiedAtDESC").startRowValue(0).rowCnt(8).build();
			Optional<List<ReviewListDto>> optionalReviewListDto = Optional
					.ofNullable(reviewDao.selectPlaceReviews(reviewSelectDto));
			List<ReviewListDto> res;
			if (!optionalReviewListDto.isEmpty()) {
				res = optionalReviewListDto.get();
			} else {
				res = new ArrayList<>();
			}

			return res;
		} else {

			return new ArrayList<>();
		}
	}

	@Transactional
	public List<ReviewListDto> deleteReview(PlacesFavoriteDto placesFavoriteDto) {
		Reviews reviews = Reviews.builder().placeName(placesFavoriteDto.getPlaceName())
				.userId(placesFavoriteDto.getUserId()).build();
		ReviewLikes reviewLikes = ReviewLikes.builder().userId(placesFavoriteDto.getUserId())
				.placeName(placesFavoriteDto.getPlaceName()).build();
		int i = reviewDao.deleteReview(reviews);
		int j = pointsDao.addLoginPoints(reviews.getUserId(), -500);
		int k = pointsDao.insertPointLog(reviews.getUserId(), "리뷰삭제", -500);
		int l = reviewDao.deleteMyReviewAndDeleteAllLike(reviewLikes);
		if (i == 1 && j == 1 && k == 1 && l == 1) {
			ReviewSelectDto reviewSelectDto = ReviewSelectDto.builder().placeName(reviews.getPlaceName())
					.userId(reviews.getUserId()).orderBy("cntLikeDESC").startRowValue(0).rowCnt(8).build();
			Optional<List<ReviewListDto>> optionalReviewListDto = Optional
					.ofNullable(reviewDao.selectPlaceReviews(reviewSelectDto));
			List<ReviewListDto> res;
			if (!optionalReviewListDto.isEmpty()) {
				res = optionalReviewListDto.get();
			} else {
				res = new ArrayList<>();
			}

			return res;
		} else {

			return new ArrayList<>();
		}
	}

	@Transactional
	public List<ReviewListDto> selectReview(ReviewSelectDto reviewSelectDto) {
		Optional<List<ReviewListDto>> optionalReviewListDtos = Optional
				.ofNullable(reviewDao.selectPlaceReviews(reviewSelectDto));
		List<ReviewListDto> res;
		if (!optionalReviewListDtos.isEmpty()) {
			res = optionalReviewListDtos.get();
		} else {
			res = new ArrayList<>();
		}

		return res;
	}

	@Transactional
	public int clickReviewLike(ReviewLikeDto reviewLikeDto) {
		Optional<ReviewLikeDto> optionalReviewLikeDto = Optional.ofNullable(reviewLikeDto);
		int res = 0;
		ReviewLikes reviewLikes;
		if (!optionalReviewLikeDto.isEmpty()) {
			reviewLikeDto = optionalReviewLikeDto.get();
			reviewLikes = reviewLikeDto.toEntity(reviewLikeDto);
		} else {

			return res;
		}
		res = reviewDao.clickReviewLike(reviewLikes);

		return res;
	}

	@Transactional
	public int deleteReviewLike(ReviewLikeDto reviewLikeDto) {
		Optional<ReviewLikeDto> optionalReviewLikeDto = Optional.ofNullable(reviewLikeDto);
		int res = 0;
		ReviewLikes reviewLikes;
		if (!optionalReviewLikeDto.isEmpty()) {
			reviewLikeDto = optionalReviewLikeDto.get();
			reviewLikes = reviewLikeDto.toEntity(reviewLikeDto);
		} else {

			return res;
		}
		res = reviewDao.deleteReviewLike(reviewLikes);

		return res;
	}

}
