package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.service.PlaceService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class HomeController {

	private final PlaceService placeService;

	@GetMapping("/")
	public String home(Model model, HttpSession session) {
		log.debug("home");
		String userId = (String) session.getAttribute("userId");
		if (userId == null) {
			System.out.println("세션에 저장된 아이디가 없습니다.");
		}
		System.out.println("세션에 저장된 아이디: " + userId);

		if (session.getAttribute("searchKeyword") != null) {
			session.removeAttribute("searchKeyword");
		}
		// 홈 디폴트 리스트 세팅
		final String addressCategory = ""; // 지역 카테고리
		final String searchKeyword = ""; // 검색어
		final String sortKey = "iScore"; // 정렬 기준
		final Integer sortValue = 1; // 오름차순 내림차순 ( 1 || 0 )
		final Integer startRowValue = 0; // 시작할 행
		final Integer rowCnt = 9; // 반환될 행의 갯수

		PlaceSearchDto placeSearchDto = PlaceSearchDto.builder().userId(userId).addressCategory(addressCategory)
				.searchKeyword(searchKeyword).sortKey(sortKey).sortValue(sortValue).startRowValue(startRowValue)
				.rowCnt(rowCnt).build();
		List<PlaceListDto> res = placeService.selectPlaceList(placeSearchDto);

		model.addAttribute("placesInfo", res);
		System.out.println(res);

		return "home";
	}
}
