package com.itwill.igojoa.dto.place;

import com.itwill.igojoa.entity.PlacesFavorite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacesFavoriteDto {
	private String placeName;
	private String userId;

	public PlacesFavorite toEntity(PlacesFavoriteDto placesFavoriteDto) {
		return PlacesFavorite.builder().placeName(placesFavoriteDto.getPlaceName())
				.userId(placesFavoriteDto.getUserId()).build();
	}

}
