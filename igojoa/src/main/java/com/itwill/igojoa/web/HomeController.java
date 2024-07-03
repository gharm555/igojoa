package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.itwill.igojoa.dto.place.PlaceBestListDto;
import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.dto.points.LottoDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class HomeController {

	private final PlaceService placeService;
	private final PointsService pointsService;
	private final UsersService usersService;

	@GetMapping("/")
	public String home(Model model, HttpSession session) {
		log.debug("home");
		String userId = (String) session.getAttribute("userId");
		if (userId == null) {
			System.out.println("세션에 저장된 아이디가 없습니다.");
		}
		if (userId != null) {
			model.addAttribute("userProfileUrl", usersService.getUserInfo(userId).getUserProfileUrl());
			model.addAttribute("points", pointsService.selectPoints(userId));
		}
		System.out.println("세션에 저장된 아이디: " + userId);
		if (session.getAttribute("searchKeyword") != null) {
			session.removeAttribute("searchKeyword");
		}

		// 홈 디폴트 리스트 세팅
		final String addressCategory = ""; // 지역 카테고리
		final String searchKeyword = ""; // 검색어
		final String sortKey = "iScore"; // 정렬 기준
		final Integer sortValue = 0; // 오름차순 내림차순 ( 1 || 0 )
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

	@PostMapping("/game")
	public ResponseEntity<String> game(@RequestBody LottoDto lottoDto, HttpSession session) {
		System.out.println("game");
		System.out.println(lottoDto.getUserId());
		System.out.println(lottoDto.getRank());
		if (session.getAttribute("userId") != null && session.getAttribute("userId").equals(lottoDto.getUserId())) {
			pointsService.subtractPoints(lottoDto.getUserId());
			pointsService.insertPointLog(lottoDto.getUserId(), "뽑기", 150);
			pointsService.insertPointLog(lottoDto.getUserId(), lottoDto.getRank(), 0);
			return ResponseEntity.ok(pointsService.selectPoints(lottoDto.getUserId()));
		} else if (lottoDto.getRank().equals("1등") || lottoDto.getRank().equals("2등")) {
			return ResponseEntity.badRequest().body("등수 바꾸지마라");
		} else {
			return ResponseEntity.badRequest().body("아이디 바꾸지마라");
		}

	}

	@GetMapping("/imageGallery")
	public ResponseEntity<List<PlaceBestListDto>> imageGallery(Model model) {

		List<PlaceBestListDto> imageGallery = placeService.selectPlaceNameAndImageUrl();
		log.debug("imageGallery: {}", imageGallery);
		model.addAttribute("imageGallery", imageGallery);
		return ResponseEntity.ok(imageGallery);
	}

}
