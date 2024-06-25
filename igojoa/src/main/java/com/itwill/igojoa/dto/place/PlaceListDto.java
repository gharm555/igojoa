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
	private String placeName;
	private String simpleAddress;
	private Integer favorites;
	private Integer totalVisit;
	private String bestReviewer;
	private String review;
	private LocalDateTime reviewModifiedAt;
	private Integer reviewLikes;
	private Float iScoreAvg;
	private Integer sumParkingAvailable;
	private Integer sumView;
	private Integer sumNightView;
	private Integer sumFreeEntry;
	private Integer sumEasyTransport;
	private Integer cntReview;
	private String firstImgName;
	private String firstUrl;
	private String secondImgName;
	private String secondUrl;
	private String thirdImgName;
	private String thirdUrl;
}
