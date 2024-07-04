package com.itwill.igojoa.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itwill.igojoa.dto.points.UserLoggedDto;
import com.itwill.igojoa.dto.points.UserMonthlyPointsDto;
import com.itwill.igojoa.dto.points.UserPointsQueryDto;
import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserSearchDto;
import com.itwill.igojoa.dto.users.UserVerifiedPlacesDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
//@RequestMapping("/user/userProfile") // 테스트 코드
public class UsersRestController {
	private final HttpSession session;
	private final UsersService usersService;
	private final PointsService pointsService;

	@GetMapping("/allInfo")
	public ResponseEntity<Map<String, Object>> getAllUserRelatedInfo(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");

//		userId = "sangwontest2"; // 테스트 코드
		
		log.debug("userId = {}", userId);
		userSearchDto.setUserId(userId);

		List<UserRelatedInfoDto> userRelatedInfoDto = usersService.getUserRelatedInfo(userSearchDto);
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

	@GetMapping("/favoritePlaces")
	public ResponseEntity<List<UserFavoritePlacesDto>> getUserFavoritePlaces(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");

//		userId = "sangwontest2"; // 테스트 코드
		
		userSearchDto.setUserId(userId);

		handleSearchKeyword(userSearchDto, userId);

		List<UserFavoritePlacesDto> getUserFavoritePlaces = usersService.getUserFavoritePlaces(userSearchDto);

		return ResponseEntity.ok(getUserFavoritePlaces);
	}

	@GetMapping("/favoriteReviews")
	public ResponseEntity<List<UserFavoriteReviewsDto>> getUserFavoriteReviews(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");

//		userId = "sangwontest2"; // 테스트 코드
		
		userSearchDto.setUserId(userId);

		handleSearchKeyword(userSearchDto, userId);

		List<UserFavoriteReviewsDto> getUserFavoriteReviews = usersService.getUserFavoriteReviews(userSearchDto);

		return ResponseEntity.ok(getUserFavoriteReviews);
	}
	
	@GetMapping("/writtenReviews")
	public ResponseEntity<List<UserWrittenReviewsDto>> getUserWrittenReviews(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트 코드
		
		userSearchDto.setUserId(userId);
		handleSearchKeyword(userSearchDto, userId);
		
		List<UserWrittenReviewsDto> getUserWrittenReviewsDto = usersService.getUserWrittenReviews(userSearchDto);
		
		return ResponseEntity.ok(getUserWrittenReviewsDto);
	}
	
	@GetMapping("/verifiedPlaces")
	public ResponseEntity<List<UserVerifiedPlacesDto>> getUserVerifiedPlaces(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트 코드
		
		userSearchDto.setUserId(userId);
		handleSearchKeyword(userSearchDto, userId);
		
		List<UserVerifiedPlacesDto> getUserVerifiedPlacesDto = usersService.getUserVerifiedPlaces(userSearchDto);
		
		return ResponseEntity.ok(getUserVerifiedPlacesDto);
	}
	
	@GetMapping("/relatedInfo")
	public ResponseEntity<List<UserRelatedInfoDto>> getUserRelatedInfo(@ModelAttribute UserSearchDto userSearchDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트 코드
		
		userSearchDto.setUserId(userId);
		handleSearchKeyword(userSearchDto, userId);
		
		List<UserRelatedInfoDto> getAllUserRelatedInfoDto = usersService.getUserRelatedInfo(userSearchDto);
		
		return ResponseEntity.ok(getAllUserRelatedInfoDto);
	}
	
	@GetMapping("/userLogged")
	public ResponseEntity<List<UserLoggedDto>> hasUserLogged(@ModelAttribute UserPointsQueryDto userPointsQueryDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트 코드
		
		userPointsQueryDto.setUserId(userId);
		
		List<UserLoggedDto> hasUserLogged = pointsService.hasUserLogged(userPointsQueryDto);
		
		return ResponseEntity.ok(hasUserLogged);
	}
	
	@GetMapping("/pointsStats")
	public ResponseEntity<UserMonthlyPointsDto> totalPointsGainedLost(@ModelAttribute UserPointsQueryDto userPointsQueryDto) {
		String userId = (String) session.getAttribute("userId");
		
//		userId = "sangwontest2"; // 테스트 코드
		
		userPointsQueryDto.setUserId(userId);
		
		UserMonthlyPointsDto totalPointsGainedLost = pointsService.totalPointsGainedLost(userPointsQueryDto);
		
		return ResponseEntity.ok(totalPointsGainedLost);
	}
	
	/**
	 * SearchKeyword의 유무를 판별하여 SearchDto에 적당한 값을 넣는 메서드
	 * @param userSearchDto
	 * @param userId
	 */
	private void handleSearchKeyword(UserSearchDto userSearchDto, String userId) {
		String searchKeyword = userSearchDto.getSearchKeyword();
		if (searchKeyword == null || searchKeyword.trim().isEmpty()) {
			userSearchDto.setSearchKeyword("");
		} else {
			userSearchDto.setUserId(userId);
			session.setAttribute("searchKeyword", searchKeyword);
			userSearchDto.setSearchKeyword(searchKeyword);
		}
	}
}
