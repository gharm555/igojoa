package com.itwill.igojoa.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserSearchDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UsersRestController {
	private final HttpSession session;
	private final UsersService usersService;

	@GetMapping("/userRelatedInfo")
	public ResponseEntity<Map<String, Object>> getAllUserRelatedInfo(@ModelAttribute UserSearchDto userSearchDto) {
		log.debug("SearchKeyword = {}", userSearchDto.getSearchKeyword());
		log.debug("SortKey = {}", userSearchDto.getSortKey());
		log.debug("SortValue = {}", userSearchDto.getSortValue());
		log.debug("StartRowValue = {}", userSearchDto.getStartRowValue());
		log.debug("RowCnt = {}", userSearchDto.getRowCnt());

		String userId = (String) session.getAttribute("userId");
		log.debug("userId = {}", userId);
		userSearchDto.setUserId(userId);

		// 테스트 코드
		userSearchDto.setStartRowValue(0);
		userSearchDto.setRowCnt(4);
		
		List<UserRelatedInfoDto> userRelatedInfoDto = usersService.getAllUserRelatedInfo(userSearchDto);
		List<UserFavoritePlacesDto> userFavoritePlacesDto = usersService.getUserFavoritePlaces(userSearchDto);
		List<UserFavoriteReviewsDto> userFavoriteReviewsDto = usersService.getUserFavoriteReviews(userSearchDto);
		List<UserWrittenReviewsDto> userWrittenReviewsDto = usersService.getUserWrittenReviews(userSearchDto);

		Map<String, Object> result = new HashMap<>();
		result.put("userRelatedInfo", userRelatedInfoDto);
		result.put("userFavoritePlaces", userFavoritePlacesDto);
		result.put("userFavoriteReviews", userFavoriteReviewsDto);
		result.put("userWrittenReviews", userWrittenReviewsDto);
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/searchFavoritePlaces")
	public ResponseEntity<List<UserFavoritePlacesDto>> searchUserFavoritePlaces(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
		userSearchDto.setUserId(userId);
		
		List<UserFavoritePlacesDto> userFavoritePlacesDto = usersService.searchUserFavoritePlaces(userSearchDto);
		
		return ResponseEntity.ok(userFavoritePlacesDto);
	}
}
