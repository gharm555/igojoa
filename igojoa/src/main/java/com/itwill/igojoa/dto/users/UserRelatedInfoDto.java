package com.itwill.igojoa.dto.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRelatedInfoDto {
	private String type;
	private String placeName;
	private String address;
	private String firstUrl;
	private String createdAt;
	private String review;
//	private String likeUserId;
//	private String nickName;
	private String reviewAuthor;
}
