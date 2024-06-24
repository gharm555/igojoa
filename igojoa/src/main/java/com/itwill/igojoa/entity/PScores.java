package com.itwill.igojoa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PScores {
	private String pName;
	private String userID;
	private String pFavorites;
	private String pIScore;
	private String pCountVisits;
}
