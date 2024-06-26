package com.itwill.igojoa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Badges {
	private String placeName;
	private String userId;
	private Integer parkingAvailable;
	private Integer view;
	private Integer nightView;
	private Integer freeEntry;
	private Integer easyTransport;
}
