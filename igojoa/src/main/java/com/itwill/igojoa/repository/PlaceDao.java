package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.dto.place.PlaceListDto;

public interface PlaceDao {
	List<PlaceListDto> select();
}
