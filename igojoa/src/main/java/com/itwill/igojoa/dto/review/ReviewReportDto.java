package com.itwill.igojoa.dto.review;

import com.itwill.igojoa.entity.ReportLogs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewReportDto {

	private String logId;
	private String reporterId;
	private String reportedId;
	private String placeName;
	private String reportReason;
	private Integer reasonCode;
	private String review;
	private String reportedNickname;

	public ReportLogs toEntity() {
		return ReportLogs.builder().logId(this.logId).reporterId(this.reporterId).reportedId(this.reportedId)
				.placeName(this.placeName).reportReason(this.reportReason).review(this.review).reasonCode(reasonCode).reportedNickName(reportedNickname).build();
	}

}
