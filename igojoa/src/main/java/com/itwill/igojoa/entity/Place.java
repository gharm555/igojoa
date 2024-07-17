package com.itwill.igojoa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Place {
	private String placeName;
	private String largeAddress;
	private String mediumAddress;
	private String smallAddress;
	private String placeDescription;
	private Double placeLatitude;
	private Double placeLongitude;
	private String operatingHours;
	private Integer iScore;
}