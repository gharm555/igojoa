package com.itwill.igojoa.dto.review;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewListDto {
	private Integer level;
	private String nickName;
	private String review;
	private LocalDateTime modifiedAt;
	private Integer parkingAvailable;
	private Integer view;
	private Integer nightView;
	private Integer freeEntry;
	private Integer easyTransport;
	private Integer iScore;
	private Integer cntLike;
	private Integer myLike;
	private String userProfileUrl;
}
