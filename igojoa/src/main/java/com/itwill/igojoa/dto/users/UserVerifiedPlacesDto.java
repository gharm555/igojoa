package com.itwill.igojoa.dto.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVerifiedPlacesDto {
	private String firstUrl;
	private String placeName;
	private String createdAt;
	private String address;
}
