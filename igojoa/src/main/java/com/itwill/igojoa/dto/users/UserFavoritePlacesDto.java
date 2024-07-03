package com.itwill.igojoa.dto.users;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserFavoritePlacesDto {
	private String placeName;
	private String address;
	private String firstUrl;
	private String createdAt;
}
