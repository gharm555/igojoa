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
public class PointsLogs {
	private String userId;
	private String userActivity;
	private LocalDateTime pointsGetLoseTime;
	private Integer increaseDecrease;
}