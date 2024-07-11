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
	private String highestBadge;
	private String secondHighestBadge;
	private String iScore;
	private Integer level;
	private Integer placeVerified;
	private String nickName;
	private String review;
	private LocalDateTime modifiedAt;
	private Integer likeCount;
	private String firstUrl;
	private String secondUrl;
	private String thirdUrl;

	public static PlaceListDto sendHomeMainContent(PlaceListDto placeListDto) {
		if (placeListDto.getIScore() == null) {
			placeListDto.setIScore("중");
			return placeListDto;
		}
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