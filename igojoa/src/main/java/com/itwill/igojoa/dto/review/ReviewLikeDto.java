package com.itwill.igojoa.dto.review;

import com.itwill.igojoa.entity.ReviewLikes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewLikeDto {
	private String userId;
	private String placeName;
	private String likeUserId;

	public ReviewLikes toEntity(ReviewLikeDto reviewLikeDto) {
		return ReviewLikes.builder().userId(userId).placeName(placeName).likeUserId(likeUserId).build();
	}
}
