package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.PointsService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class HomeController {

	private final PlaceService placeService;
	private final PointsService pointsService;

	@GetMapping("/")
	public String home(Model model, HttpSession session) {
		log.debug("home");
		String userId = (String) session.getAttribute("userId");
		if (userId == null) {
			System.out.println("세션에 저장된 아이디가 없습니다.");
		}
		System.out.println("세션에 저장된 아이디: " + userId);

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

		model.addAttribute("list", res);
		System.out.println(res);

		return "home";
	}

	@GetMapping("/game")
	public ResponseEntity<String> game(String userId, String rank) {
		System.out.println("game");
		System.out.println(userId);
		System.out.println(rank);
		pointsService.subtractPoints(userId, 100);
		pointsService.insertPointLog(userId, "뽑기", 100);
		pointsService.insertPointLog(userId, rank, 0);
		switch (rank) {
			case "1":
				return ResponseEntity.ok("1");
			case "2":
				return ResponseEntity.ok("2");
			case "3":
				return ResponseEntity.ok("3");
			case "4":
				return ResponseEntity.ok("4");
			case "5":
				return ResponseEntity.ok("5");
			default:
				return ResponseEntity.ok("0");
		}
	}

}
