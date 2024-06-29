package com.itwill.igojoa.service;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriUtils;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.repository.PlaceDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {
	private final PlaceDao placeDao;

	@Transactional
	public List<PlaceListDto> selectPlaceList(PlaceSearchDto placeSearchDto) {
		log.debug("selectPlaceList()");

		Optional<List<PlaceListDto>> optionalPlaceListDto = Optional
				.ofNullable(placeDao.selectPlaceList(placeSearchDto));
		List<PlaceListDto> placeListDtos;
		if (!optionalPlaceListDto.isEmpty()) {
			placeListDtos = optionalPlaceListDto.get();
			placeListDtos.stream().map(PlaceListDto::sendHomeMainContent).toList();
		} else {
			placeListDtos = Collections.emptyList();
		}

		return placeListDtos;
	}

	@Transactional
	public int clickHeart(String placeName, String userId) {
		int res;
		res = placeDao.clickHeart(placeName, userId);

		return res;
	}

	@Transactional
	public int deleteHeart(String encodedPlaceName, String userId) {
		String placeName = UriUtils.decode(encodedPlaceName, StandardCharsets.UTF_8);
		int res;
		res = placeDao.deleteHeart(placeName, userId);

		return res;
	}

}
