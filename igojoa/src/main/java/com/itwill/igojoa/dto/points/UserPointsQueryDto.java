package com.itwill.igojoa.dto.points;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPointsQueryDto {
	private String userId;
	private String yearMonth;
	private String yearMonthDay;
}
