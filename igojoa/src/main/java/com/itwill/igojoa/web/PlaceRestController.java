package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlaceFavoriteDto;
import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PlaceRestController {
	private final HttpSession session;
	private final PlaceService placeService;
	private final UsersService usersService;

	@GetMapping("/search")
	public ResponseEntity<List<PlaceListDto>> searchList(@ModelAttribute PlaceSearchDto placeSearchDto) {
		log.debug("searchList()??????????????");
		System.out.println(placeSearchDto);
		String searchKeyword = placeSearchDto.getSearchKeyword();

		if (searchKeyword == null) {
			placeSearchDto.setSearchKeyword("");
		} else {
			session.setAttribute("searchKeyword", searchKeyword);
			placeSearchDto.setSearchKeyword(searchKeyword);
			System.out.println(searchKeyword);
		}

		List<PlaceListDto> res = placeService.selectPlaceList(placeSearchDto);

		return ResponseEntity.ok(res);
	}

	@PutMapping("/clickHeart")
	public ResponseEntity<Integer> clickHeart(@RequestBody PlaceFavoriteDto placeFavoriteDto) {
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {
				return ResponseEntity.badRequest().body(0);
			}
		}
		System.out.println(placeFavoriteDto);
		System.out.println(placeFavoriteDto);
		int res = 1;
		return ResponseEntity.ok(res);
	}
}
