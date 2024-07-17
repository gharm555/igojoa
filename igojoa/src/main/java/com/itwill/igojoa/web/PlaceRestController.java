package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
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
		log.debug("searchList()");
		System.out.println(placeSearchDto);
		String searchKeyword = placeSearchDto.getSearchKeyword();
		if (searchKeyword == null) {
			placeSearchDto.setSearchKeyword("");
		} else {
			placeSearchDto.setUserId((String) session.getAttribute("userId"));
			session.setAttribute("searchKeyword", searchKeyword);
			placeSearchDto.setSearchKeyword(searchKeyword);
			System.out.println(searchKeyword);
		}
		List<PlaceListDto> res = placeService.selectPlaceList(placeSearchDto);

		return ResponseEntity.ok(res);
	}

	@PutMapping("/clickHeart")
	public ResponseEntity<Integer> clickHeart(@RequestBody String placeName) {
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {

				return ResponseEntity.badRequest().body(0);
			}
		} else {
			return ResponseEntity.ok(0);
		}

		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		int res = placeService.clickHeart(placesFavoriteDto);
		if (res == 1) {

			return ResponseEntity.ok(res);
		} else {

			return ResponseEntity.badRequest().body(0);
		}
	}

	@DeleteMapping("/deleteHeart/{placeName}")
	public ResponseEntity<Integer> deleteHeart(@PathVariable String placeName) {
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			if (sessionCheck == 0) {

				return ResponseEntity.badRequest().body(0);
			}
		} else {
			return ResponseEntity.ok(0);
		}
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		int res = placeService.deleteHeart(placesFavoriteDto);
		if (res == 1) {

			return ResponseEntity.ok(res);
		} else {

			return ResponseEntity.badRequest().body(0);
		}
	}
	
	@GetMapping("/searchSuggestions")
	public ResponseEntity<List<String>> searchSuggestions(@ModelAttribute PlaceSearchDto placeSearchDto) {
		List<String> res = placeService.searchSuggestions(placeSearchDto);
		
		return ResponseEntity.ok(res);
	}
	
}
