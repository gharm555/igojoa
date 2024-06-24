package com.itwill.igojoa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reviews {
	private String pName;
	private String userId;
	private String uNickname;
	private String review;
	private String createdAt;
}
