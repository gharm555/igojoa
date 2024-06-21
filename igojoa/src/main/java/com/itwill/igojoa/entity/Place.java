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
	private String pName;
	private String pLocation;
	private String mon;
	private String tue;
}
