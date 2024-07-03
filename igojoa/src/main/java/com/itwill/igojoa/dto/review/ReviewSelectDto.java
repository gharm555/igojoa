package com.itwill.igojoa.dto.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewSelectDto {
	private String placeName;
	private String userId;
	private String orderBy;
	private Integer startRowValue;
	private Integer rowCnt;
}
