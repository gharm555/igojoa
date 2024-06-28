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
	private String address;
	private Integer userFavorite;
	private Integer parkingAvailable;
	private Integer view;
	private Integer nightView;
	private Integer freeEntry;
	private Integer easyTransport;
	private String iScore;
	private Integer placeVerified;
	private String userId;
	private String review;
	private LocalDateTime modifiedAt;
	private Integer likeCount;
	private String firstUrl;
	private String secondUrl;
	private String thirdUrl;

	public static PlaceListDto sendHomeMainContent(PlaceListDto placeListDto) {
		if (placeListDto.getIScore().equals("1")) {
			placeListDto.setIScore("하");
		} else if (placeListDto.getIScore().equals("2")) {
			placeListDto.setIScore("중");
		} else if (placeListDto.getIScore().equals("3")) {
			placeListDto.setIScore("상");
		} 
		return placeListDto;
	}
}
