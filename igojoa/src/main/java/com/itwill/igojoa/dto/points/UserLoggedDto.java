package com.itwill.igojoa.dto.points;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoggedDto {
	private String loginDate;
	private String userActivity;
	private String pointsGetLoseTime;
	private int points;
}
