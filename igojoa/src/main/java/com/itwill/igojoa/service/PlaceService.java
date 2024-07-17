package com.itwill.igojoa.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.place.PlaceBestListDto;
import com.itwill.igojoa.dto.place.PlaceDetailDto;
import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.entity.PlacesFavorite;
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
		placeSearchDto.setSearchKeyword(placeSearchDto.getSearchKeyword().replaceAll("[^\\wㄱ-힣.]", ""));
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
	public int clickHeart(PlacesFavoriteDto placesFavoriteDto) {
		Optional<PlacesFavoriteDto> optionalPlacesFavorite = Optional.ofNullable(placesFavoriteDto);
		int res = 0;
		PlacesFavorite placesFavorite;
		if (!optionalPlacesFavorite.isEmpty()) {
			placesFavoriteDto = optionalPlacesFavorite.get();
			placesFavorite = placesFavoriteDto.toEntity(placesFavoriteDto);
		} else {

			return res;
		}
		res = placeDao.clickHeart(placesFavorite);

		return res;
	}

	@Transactional
	public int deleteHeart(PlacesFavoriteDto placesFavoriteDto) {
		Optional<PlacesFavoriteDto> optionalPlacesFavorite = Optional.ofNullable(placesFavoriteDto);
		int res = 0;
		PlacesFavorite placesFavorite;
		if (!optionalPlacesFavorite.isEmpty()) {
			placesFavoriteDto = optionalPlacesFavorite.get();
			placesFavorite = placesFavoriteDto.toEntity(placesFavoriteDto);
		} else {

			return res;
		}
		res = placeDao.deleteHeart(placesFavorite);

		return res;
	}

	@Transactional
	public PlaceDetailDto selectPlaceDetail(PlacesFavoriteDto placesFavoriteDto) {
		Optional<PlacesFavoriteDto> optionalPlacesFavorite = Optional.ofNullable(placesFavoriteDto);
		PlaceDetailDto placeDetailDto;
		if (!optionalPlacesFavorite.isEmpty()) {
			placesFavoriteDto = optionalPlacesFavorite.get();
			Optional<PlaceDetailDto> optionalPlaceDetailDto = Optional
					.ofNullable(placeDao.selectPlaceDetail(placesFavoriteDto));
			if (!optionalPlaceDetailDto.isEmpty()) {
				placeDetailDto = optionalPlaceDetailDto.get();
			} else {
				placeDetailDto = new PlaceDetailDto();
			}
		} else {
			placeDetailDto = new PlaceDetailDto();
		}

		return placeDetailDto;
	}

	@Transactional
	public List<String> searchSuggestions(PlaceSearchDto placeSearchDto) {
		if (placeSearchDto.getAddressCategory() == null) {
			placeSearchDto.setAddressCategory("");
		}
		placeSearchDto.setSearchKeyword(placeSearchDto.getSearchKeyword().replaceAll("[^\\wㄱ-힣.]", ""));
		List<String> res = placeDao.searchSuggestions(placeSearchDto);

		return res;
	}

	public List<PlaceBestListDto> selectPlaceNameAndImageUrl() {
		return placeDao.selectPlaceNameAndImageUrl();
	}
}
