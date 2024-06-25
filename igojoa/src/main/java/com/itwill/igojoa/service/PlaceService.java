package com.itwill.igojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.repository.PlaceDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {
	private final PlaceDao placeDao;

	public List<PlaceListDto> selectPlaceList() {
		log.debug("selectPlaceList()");
		return placeDao.selectPlaceList();
	}
}
