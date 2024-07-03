package com.itwill.igojoa.dto.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserFavoriteReviewsDto {
	private String placeName;
	private String review;
	private String createdAt;
	private String likeUserId;
	private String nickName;
	private String firstUrl;
}
