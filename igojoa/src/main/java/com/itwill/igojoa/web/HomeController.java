package com.itwill.igojoa.web;

import java.util.List;
import java.util.Map;

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
import com.itwill.igojoa.entity.Faq;
import com.itwill.igojoa.service.FaqService;
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
	private final FaqService faqService;

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
		final Integer sortValue = 1; // 오름차순 내림차순 ( 1 || 0 )
		final Integer startRowValue = 0; // 시작할 행
		final Integer rowCnt = 9; // 반환될 행의 갯수

		PlaceSearchDto placeSearchDto = PlaceSearchDto.builder().userId(userId).addressCategory(addressCategory)
				.searchKeyword(searchKeyword).sortKey(sortKey).sortValue(sortValue).startRowValue(startRowValue)
				.rowCnt(rowCnt).build();
		List<PlaceListDto> res = placeService.selectPlaceList(placeSearchDto);

		model.addAttribute("placesInfo", res);
		System.out.println(res);
		List<Faq> faqList = faqService.getAllFaqs();
		model.addAttribute("faqList", faqList);
		return "home";
	}

	@PostMapping("/game")
	public ResponseEntity<?> game(@RequestBody LottoDto lottoDto, HttpSession session) {
		System.out.println("game");
		System.out.println(lottoDto);
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			long matchCount = lottoDto.getLottoNum().stream().filter(lottoDto.getUserNum()::contains).count();
			boolean isBonusMatched = lottoDto.getUserNum().contains(lottoDto.getBonusBall());
			String rank = "";
			String productName = "";
			String matchCountString = "";
			if (matchCount == 6) {
				rank = "1등";
				productName = "한남더힐 아파트";
				matchCountString = "6개";
			}
			if (matchCount == 5 && isBonusMatched) {
				rank = "2등";
				productName = "포르쉐";
				matchCountString = "5개";
			}
			if (matchCount == 5) {
				rank = "3등";
				productName = "책@스초코";
				matchCountString = "5개";
			}
			if (matchCount == 4) {
				rank = "4등";
				productName = "스타벅스 아메리카노";
				matchCountString = "4개";
			}
			if (matchCount == 3) {
				rank = "5등";
				productName = "마이쮸";
				matchCountString = "3개";
			}
			if (matchCount == 2) {
				rank = "6등";
				productName = "청포도 사탕";
				matchCountString = "2개";
			}
			if (matchCount == 1) {
				rank = "꽝";
				productName = "다음 기회에";
				matchCountString = "1개";
			}
			if (matchCount == 0) {
				rank = "꽝";
				productName = "다음 기회에";
				matchCountString = "0개";
			}

			pointsService.subtractPoints(userId);
			pointsService.insertPointLog(userId, "뽑기", -150);
			pointsService.insertPointLog(userId, rank, 0);
			return ResponseEntity.ok(Map.of("points", pointsService.selectPoints(userId), "rank", rank,
					"productName", productName, "matchCount", matchCountString, "lottoNum", lottoDto.getLottoNum(),
					"userNum", lottoDto.getUserNum(), "bonusBall", lottoDto.getBonusBall()));
		} else {
			return ResponseEntity.badRequest().body("로그인 해주세요");
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
