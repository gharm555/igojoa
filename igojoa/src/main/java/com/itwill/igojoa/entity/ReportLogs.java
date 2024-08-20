package com.itwill.igojoa.entity;

import java.time.LocalDateTime;

import com.itwill.igojoa.dto.review.ReviewReportDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportLogs {

	private String logId;
	private String reporterId;
	private String reportedId;
	private String placeName;
	private LocalDateTime reportTime;
	private String reportReason;
	private String review;
	private String nickName;
}
