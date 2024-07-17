package com.itwill.igojoa.dto.review;

import com.itwill.igojoa.entity.Reviews;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDto {
	private String placeName;
	private String userId;
	private String review;
	private Integer parkingAvailable;
	private Integer view;
	private Integer nightView;
	private Integer freeEntry;
	private Integer easyTransport;
	private Integer iscore;

	public Reviews toEntity(ReviewDto reviewDto) {
		return Reviews.builder().placeName(placeName).userId(userId).review(review).parkingAvailable(parkingAvailable)
				.view(view).nightView(nightView).freeEntry(freeEntry).easyTransport(easyTransport).iScore(iscore)
				.build();
	}
}
