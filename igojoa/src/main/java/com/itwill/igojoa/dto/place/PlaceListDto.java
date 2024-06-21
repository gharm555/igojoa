package com.itwill.igojoa.dto.place;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceListDto {
	private String pName;
	private String pLocation;
	private Integer totalVisit;
	private String bestReviewNickname;
	private String bestReview;
	private LocalDateTime createdAt;
	private Integer bestReviewLikes;
	private String imgLocation;
}
