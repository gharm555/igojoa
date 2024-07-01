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
public class PlacesFavorite {
	private String placeName;
	private String userId;
	private LocalDateTime createdTime;

}