package com.itwill.igojoa.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.dto.place.PlaceSpaceDto;

public interface PlaceDao {
	List<PlaceListDto> selectPlaceList(PlaceSearchDto placeSearchDto);

	List<PlaceSpaceDto> selectPlaceSpaceList();

	int clickHeart(@Param("placeName") String placeName, @Param("userId") String userId);
	
	int deleteHeart(@Param("placeName") String placeName, @Param("userId") String userId);
}
