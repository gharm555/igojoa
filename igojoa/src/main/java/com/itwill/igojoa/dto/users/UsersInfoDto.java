package com.itwill.igojoa.dto.users;

import com.itwill.igojoa.entity.Points;
import com.itwill.igojoa.entity.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersInfoDto {
	private String userId;
	private String email;
	private String phoneNumber;
	private String nickName;
	private String userProfileUrl;
	private int currentsPoints;
	private int cumulativePoint;

	public static UsersInfoDto fromEntity(Users user, Points points) {
		return UsersInfoDto.builder()
				.userId(user.getUserId())
				.email(user.getEmail())
				.phoneNumber(user.getPhoneNumber())
				.nickName(user.getNickName())
				.userProfileUrl(user.getUserProfileUrl())
				.currentsPoints(points.getCurrentsPoints())
				.cumulativePoint(points.getCumulativePoint())
				.build();
	}
}
