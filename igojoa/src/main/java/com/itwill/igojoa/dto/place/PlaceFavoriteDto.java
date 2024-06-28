package com.itwill.igojoa.dto.place;

import com.itwill.igojoa.entity.PlacesFavorite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceFavoriteDto {
	private String placeName;
	private String userId;

	public PlacesFavorite fromEntity(PlaceFavoriteDto placeFavoriteDto) {
		return PlacesFavorite.builder().placeName(placeName).userId(userId).build();
	}
}
