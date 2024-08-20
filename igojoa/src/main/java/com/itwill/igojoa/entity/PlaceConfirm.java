package com.itwill.igojoa.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceConfirm {
    private String placeName;
    private String reporterId;
	private String largeAddress;
	private String mediumAddress;
	private String smallAddress;
	private String placeDescription;
	private Double placeLatitude;
	private Double placeLongitude;
	private String operatingHours;
    private Integer radius;
	private LocalDate displayDate;
}
