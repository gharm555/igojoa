package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.dto.place.PlaceBestListDto;
import com.itwill.igojoa.dto.place.PlaceDetailDto;
import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.dto.place.PlaceSpaceDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.entity.PlacesFavorite;

public interface PlaceDao {
	List<PlaceListDto> selectPlaceList(PlaceSearchDto placeSearchDto);

	List<PlaceSpaceDto> selectPlaceSpaceList();

	int clickHeart(PlacesFavorite placesFavorite);

	int deleteHeart(PlacesFavorite placesFavorite);

	PlaceDetailDto selectPlaceDetail(PlacesFavoriteDto placesFavoriteDto);

	List<PlaceBestListDto> selectPlaceNameAndImageUrl();

	List<String> searchSuggestions(PlaceSearchDto placeSearchDto);

	int deleteAllPlaceFavorite(String userId);
}
