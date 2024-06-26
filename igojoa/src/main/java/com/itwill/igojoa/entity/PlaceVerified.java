package com.itwill.igojoa.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceVerified {
	private String userId;
	private String placeName;
	private LocalDateTime verifiedTime;
	private Double placeLatitude;
	private Double placeLongitude;
}