package com.itwill.igojoa.dto.place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceDetailDto {
	private String placeName;
	private String firstUrl;
	private String secondUrl;
	private String thirdUrl;
	private String address;
	private String placeDescription;
	private Double placeLatitude;
	private Double placeLongitude;
	private String operatingHours;
	private Integer totalParkingAvailable;
	private Integer totalView;
	private Integer totalNightView;
	private Integer totalFreeEntry;
	private Integer totalEasyTransport;
	private Integer avgIScore;
	private String review;
	private Integer parkingAvailable;
	private Integer view;
	private Integer nightView;
	private Integer freeEntry;
	private Integer easyTransport;
	private Integer iScore;
	private Integer userFavorite;

}
