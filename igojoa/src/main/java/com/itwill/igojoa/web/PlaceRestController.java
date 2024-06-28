package com.itwill.igojoa.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.place.PlaceListDto;
import com.itwill.igojoa.dto.place.PlaceSearchDto;
import com.itwill.igojoa.service.PlaceService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PlaceRestController {
	private final HttpSession session;
	private final PlaceService placeService;

	@GetMapping("/search")
	public ResponseEntity<List<PlaceListDto>> searchList(@ModelAttribute PlaceSearchDto placeSearchDto) {
		log.debug("searchList()??????????????");
		System.out.println(placeSearchDto);
		placeSearchDto.setSearchKeyword("");
		session.setAttribute("searchKeyword", placeSearchDto.getSearchKeyword());

		List<PlaceListDto> res = placeService.selectPlaceList(placeSearchDto);

		return ResponseEntity.ok(res);
	}
}
