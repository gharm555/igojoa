package com.itwill.igojoa.service;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class PlaceServiceTest {
	@Autowired
	private PlaceService placeService;

//	@Test
	public void showPlaceListTest() {
		log.debug("showPlaceListTest()");
		// 메인페이지 리스트
		final String userId = null; // 로그인한 유저 id || 로그인안하면 null
		final String addressCategory = ""; // 지역 카테고리
		final String searchKeyword = ""; // 검색어
		final String sortKey = "iScore"; // 정렬버튼 종류 총 4가지
		final Integer sortValue = 1; // 오름차순 내림차순 ( 1 || 0 )
		final Integer startRowValue = 0; // 시작할 행
		final Integer rowCnt = 9; // 반환될 행의 갯수

		PlaceSearchDto placeSearchDto = PlaceSearchDto.builder().userId(userId).addressCategory(addressCategory)
				.searchKeyword(searchKeyword).sortKey(sortKey).sortValue(sortValue).startRowValue(startRowValue)
				.rowCnt(rowCnt).build();

		List<PlaceListDto> res = placeService.selectPlaceList(placeSearchDto);

		System.out.println("\n\n\n\n\n");
		for (PlaceListDto placeListDto : res) {
			System.out.println(placeListDto);
		}
		System.out.println("\n\n\n\n\n");
	}

	@Test
	public void searchSuggestionsTest() {
		System.out.println("\n\n" + "searchFirstInitialTest()" + "\n\n");
		PlaceSearchDto placeSearchDto = PlaceSearchDto.builder().addressCategory("").searchKeyword("팔공산갓").build();
		System.out.println("\n\n" + placeSearchDto.toString() + "\n\n");
		placeSearchDto.setSearchKeyword(placeSearchDto.getSearchKeyword().replaceAll("[^\\wㄱ-힣.]", ""));
		
		System.out.println("???" + placeSearchDto.getSearchKeyword());
		
		List<String> res = placeService.searchSuggestions(placeSearchDto);
		System.out.println("\n\n\n\n\n");
		for (String string : res) {
			System.out.println(string);
		}
		System.out.println("\n\n\n\n\n");
	}
}
