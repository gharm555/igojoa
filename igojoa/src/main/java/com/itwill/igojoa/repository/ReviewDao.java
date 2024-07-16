package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.dto.review.ReviewSelectDto;
import com.itwill.igojoa.entity.ReviewLikes;
import com.itwill.igojoa.entity.Reviews;

public interface ReviewDao {
	int insertReview(Reviews reviews);

	int updateReview(Reviews reviews);

	int deleteReview(Reviews reviews);

	List<ReviewListDto> selectPlaceReviews(ReviewSelectDto reviewSelectDto);

	int clickReviewLike(ReviewLikes reviewLikes);

	int deleteReviewLike(ReviewLikes reviewLikes);
	
	int deleteMyReviewAndDeleteAllLike(ReviewLikes reviewLikes);

	int deleteAllReview(String userId);

	int deleteAllReviewLike(String userId);
}
