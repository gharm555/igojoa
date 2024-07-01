package com.itwill.igojoa.dto.review;

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
}
