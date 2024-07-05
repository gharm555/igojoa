package com.itwill.igojoa.dto.points;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPointsDto {
	private int totalPointsGained;
	private int totalPointsLost;
}
