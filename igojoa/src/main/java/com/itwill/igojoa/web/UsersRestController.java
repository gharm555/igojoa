package com.itwill.igojoa.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserSearchDto;
import com.itwill.igojoa.dto.users.UserVerifiedPlacesDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
//@RequestMapping("/user/userProfile")
public class UsersRestController {
	private final HttpSession session;
	private final UsersService usersService;

	@GetMapping("/userRelatedInfo")
	public ResponseEntity<Map<String, Object>> getAllUserRelatedInfo(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트코드
		log.debug("userId = {}", userId);
		userSearchDto.setUserId(userId);

		// 테스트 코드
//		userSearchDto.setStartRowValue(0);
//		userSearchDto.setRowCnt(4);

		List<UserRelatedInfoDto> userRelatedInfoDto = usersService.getAllUserRelatedInfo(userSearchDto);
		List<UserFavoritePlacesDto> userFavoritePlacesDto = usersService.getUserFavoritePlaces(userSearchDto);
		List<UserFavoriteReviewsDto> userFavoriteReviewsDto = usersService.getUserFavoriteReviews(userSearchDto);
		List<UserWrittenReviewsDto> userWrittenReviewsDto = usersService.getUserWrittenReviews(userSearchDto);
		List<UserVerifiedPlacesDto> userVerifiedPlacesDto = usersService.getUserVerifiedPlaces(userSearchDto);

		Map<String, Object> result = new HashMap<>();
		result.put("userRelatedInfo", userRelatedInfoDto);
		result.put("userFavoritePlaces", userFavoritePlacesDto);
		result.put("userFavoriteReviews", userFavoriteReviewsDto);
		result.put("userWrittenReviews", userWrittenReviewsDto);
		result.put("userVerifiedPlaces", userVerifiedPlacesDto);
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/searchFavoritePlaces")
	public ResponseEntity<List<UserFavoritePlacesDto>> searchUserFavoritePlaces(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트코드
		
		userSearchDto.setUserId(userId);
		
		List<UserFavoritePlacesDto> searchUserFavoritePlaces = usersService.searchUserFavoritePlaces(userSearchDto);
		
		return ResponseEntity.ok(searchUserFavoritePlaces);
	}
	
	@GetMapping("/searchFavoriteReviews")
	public ResponseEntity<List<UserFavoriteReviewsDto>> searchUserFavoriteReviews(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트코드
		
		userSearchDto.setUserId(userId);
		
		// 추가된 코드 -->
		String searchKeyword = userSearchDto.getSearchKeyword();
		if (searchKeyword == null) {
			userSearchDto.setSearchKeyword("");
		} else {
			userSearchDto.setUserId(userId);
			session.setAttribute("searchKeyword", searchKeyword);
			userSearchDto.setSearchKeyword(searchKeyword);
		}
		// <-- 추가된 코드
		
		List<UserFavoriteReviewsDto> searchUserFavoriteReviews = usersService.searchUserFavoriteReviews(userSearchDto);
		
		return ResponseEntity.ok(searchUserFavoriteReviews);
	}
}
