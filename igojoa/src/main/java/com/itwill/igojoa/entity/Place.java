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
	private String simpleAddress;
	private String detailedAddress;
	private String placeDescription;
	private Double placeLatitude;
	private Double placeLongitude;
	private String openHoursMon;
	private String openHoursTue;
	private String openHoursWed;
	private String openHoursThu;
	private String openHoursFri;
	private String openHoursSat;
	private String openHoursSun;
}
