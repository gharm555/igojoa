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
	private String placeVerifiedUsers;
	private String verifiedPlace;
	private Double verifiedLatitude;
	private Double verifiedLongitude;
	private LocalDateTime verifiedTime;
}