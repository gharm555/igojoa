package com.itwill.igojoa.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.place.PlaceBestListDto;
import com.itwill.igojoa.dto.place.PlaceConfirmDto;
import com.itwill.igojoa.dto.place.PlaceDetailDto;
import com.itwill.igojoa.dto.place.PlaceImageDto;
import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.entity.PlaceConfirm;
import com.itwill.igojoa.entity.PlaceImages;
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

	
	// 명소 제보할때 중복 체크 
	@Transactional
	  public boolean isConfirmRequestDuplicate(PlaceConfirmDto placeConfirmDto) {
	        int count = placeDao.overlapCheckConfirm(placeConfirmDto);
	        return count > 0;
	    }

	@Transactional
public int insertPlace(PlaceConfirmDto placeConfirmDto) {
    if (placeConfirmDto == null) {
        throw new IllegalArgumentException("PlaceConfirmDto cannot be null");
    }

    try {
        PlaceConfirm placeConfirm = placeConfirmDto.toEntity();
        
      
        
        return placeDao.insertConfirmPlace(placeConfirm);
    } catch (Exception e) {
        log.error("Failed to insert place", e);
        throw new RuntimeException("Failed to insert place", e);
    }
}






@Transactional
public int insertPlaceImages(PlaceImageDto placeImageDto) {
    int result = 0;
    String placeName = placeImageDto.getPlaceName();
    List<String> imageNames = placeImageDto.getImageNames();
    List<String> imageUrls = placeImageDto.getImageUrls();
	log.info("placeImageDto={} 이거임",placeImageDto);
	PlaceImages image = new PlaceImages();
	image.setPlaceName(placeName);



	PlaceImages placeImages = new PlaceImages();
	placeImages.setPlaceName(placeName);
	
	String[] imageNameArray = new String[3];
	String[] imageUrlArray = new String[3];
	
	// 이미지 이름 처리
	for (int i = 0; i < 3; i++) {
		if (i < imageNames.size()) {
			imageNameArray[i] = imageNames.get(i);
		} else {
			imageNameArray[i] = null;
		}
	}
	
	// 이미지 URL 처리
	for (int i = 0; i < 3; i++) {
		if (i < imageUrls.size()) {
			imageUrlArray[i] = imageUrls.get(i);
		} else {
			imageUrlArray[i] = null;
		}
	}
	
	// PlaceImages 객체에 값 설정
	placeImages.setFirstImgName(imageNameArray[0]);
	placeImages.setFirstUrl(imageUrlArray[0]);
	placeImages.setSecondImgName(imageNameArray[1]);
	placeImages.setSecondUrl(imageUrlArray[1]);
	placeImages.setThirdImgName(imageNameArray[2]);
	placeImages.setThirdUrl(imageUrlArray[2]);
	
	

	
  
		
		result = placeDao.insertPlaceImage(placeImages);
    return result;
}

}
