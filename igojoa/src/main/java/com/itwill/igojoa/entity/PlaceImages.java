package com.itwill.igojoa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceImages {
	private String placeName;
	private String firstImgName;
	private String firstUrl;
	private String secondImgName;
	private String secondUrl;
	private String thirdImgName;
	private String thirdUrl;
}