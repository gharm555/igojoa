package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.dto.review.ReviewListDto;
import com.itwill.igojoa.dto.review.ReviewSelectDto;
import com.itwill.igojoa.entity.Reviews;

public interface ReviewDao {
	int insertReview(Reviews reviews);

	List<ReviewListDto> selectPlaceReviews(ReviewSelectDto reviewSelectDto);
}
