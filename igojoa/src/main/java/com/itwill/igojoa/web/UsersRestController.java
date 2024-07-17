package com.itwill.igojoa.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.dto.points.UserLoggedDto;
import com.itwill.igojoa.dto.points.UserPointsDto;
import com.itwill.igojoa.dto.points.UserPointsQueryDto;
import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserSearchDto;
import com.itwill.igojoa.dto.users.UserVerifiedPlacesDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.S3Service;
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
	private final S3Service s3Service;

	@GetMapping("/allInfo")
	public ResponseEntity<Map<String, Object>> getAllUserRelatedInfo(@ModelAttribute UserSearchDto userSearchDto) {
		userSearchDto.setUserId(getUserIdFromSession(session));
		handleSearchKeyword(userSearchDto, getUserIdFromSession(session));
		
		List<UserRelatedInfoDto> userRelatedInfoDto = usersService.getUserRelatedInfo(userSearchDto);
//		List<UserFavoritePlacesDto> userFavoritePlacesDto = usersService.getUserFavoritePlaces(userSearchDto);
//		List<UserFavoriteReviewsDto> userFavoriteReviewsDto = usersService.getUserFavoriteReviews(userSearchDto);
//		List<UserWrittenReviewsDto> userWrittenReviewsDto = usersService.getUserWrittenReviews(userSearchDto);
//		List<UserVerifiedPlacesDto> userVerifiedPlacesDto = usersService.getUserVerifiedPlaces(userSearchDto);

		Map<String, Object> result = new HashMap<>();
		result.put("userRelatedInfo", userRelatedInfoDto);
//		result.put("userFavoritePlaces", userFavoritePlacesDto);
//		result.put("userFavoriteReviews", userFavoriteReviewsDto);
//		result.put("userWrittenReviews", userWrittenReviewsDto);
//		result.put("userVerifiedPlaces", userVerifiedPlacesDto);

		return ResponseEntity.ok(result);
		
		
	}

	@GetMapping("/favoritePlaces")
	public ResponseEntity<List<UserFavoritePlacesDto>> getUserFavoritePlaces(@ModelAttribute UserSearchDto userSearchDto) {
		userSearchDto.setUserId(getUserIdFromSession(session));
		handleSearchKeyword(userSearchDto, getUserIdFromSession(session));

		List<UserFavoritePlacesDto> getUserFavoritePlaces = usersService.getUserFavoritePlaces(userSearchDto);

		return ResponseEntity.ok(getUserFavoritePlaces);
	}

	@GetMapping("/favoriteReviews")
	public ResponseEntity<List<UserFavoriteReviewsDto>> getUserFavoriteReviews(@ModelAttribute UserSearchDto userSearchDto) {
		userSearchDto.setUserId(getUserIdFromSession(session));
		handleSearchKeyword(userSearchDto, getUserIdFromSession(session));

		List<UserFavoriteReviewsDto> getUserFavoriteReviews = usersService.getUserFavoriteReviews(userSearchDto);

		return ResponseEntity.ok(getUserFavoriteReviews);
	}

	@GetMapping("/writtenReviews")
	public ResponseEntity<List<UserWrittenReviewsDto>> getUserWrittenReviews(@ModelAttribute UserSearchDto userSearchDto) {
		userSearchDto.setUserId(getUserIdFromSession(session));
		handleSearchKeyword(userSearchDto, getUserIdFromSession(session));

		List<UserWrittenReviewsDto> getUserWrittenReviewsDto = usersService.getUserWrittenReviews(userSearchDto);

		return ResponseEntity.ok(getUserWrittenReviewsDto);
	}

	@GetMapping("/verifiedPlaces")
	public ResponseEntity<List<UserVerifiedPlacesDto>> getUserVerifiedPlaces(@ModelAttribute UserSearchDto userSearchDto) {
		userSearchDto.setUserId(getUserIdFromSession(session));
		handleSearchKeyword(userSearchDto, getUserIdFromSession(session));

		List<UserVerifiedPlacesDto> getUserVerifiedPlacesDto = usersService.getUserVerifiedPlaces(userSearchDto);

		return ResponseEntity.ok(getUserVerifiedPlacesDto);
	}

	@GetMapping("/relatedInfo")
	public ResponseEntity<List<UserRelatedInfoDto>> getUserRelatedInfo(@ModelAttribute UserSearchDto userSearchDto) {
		userSearchDto.setUserId(getUserIdFromSession(session));
		handleSearchKeyword(userSearchDto, getUserIdFromSession(session));

		List<UserRelatedInfoDto> getAllUserRelatedInfoDto = usersService.getUserRelatedInfo(userSearchDto);

		return ResponseEntity.ok(getAllUserRelatedInfoDto);
	}

	@GetMapping("/userLogged")
	public ResponseEntity<List<UserLoggedDto>> hasUserLogged(@ModelAttribute UserPointsQueryDto userPointsQueryDto) {
		userPointsQueryDto.setUserId(getUserIdFromSession(session));
		List<UserLoggedDto> hasUserLogged = pointsService.hasUserLogged(userPointsQueryDto);

		return ResponseEntity.ok(hasUserLogged);
	}

	@GetMapping("/pointsStats")
	public ResponseEntity<UserPointsDto> totalPointsGainedLost(@ModelAttribute UserPointsQueryDto userPointsQueryDto) {
		userPointsQueryDto.setUserId(getUserIdFromSession(session));

		UserPointsDto totalPointsGainedLost = pointsService.totalPointsGainedLost(userPointsQueryDto);

		return ResponseEntity.ok(totalPointsGainedLost);
	}

	@GetMapping("/pointsLogs")
	public ResponseEntity<List<UserLoggedDto>> dailyPointsLogs(@ModelAttribute UserPointsQueryDto userPointsQueryDto) {
		userPointsQueryDto.setUserId(getUserIdFromSession(session));

		List<UserLoggedDto> dailyPointsLogs = pointsService.dailyPointsLogs(userPointsQueryDto);

		return ResponseEntity.ok(dailyPointsLogs);

	}

	@PutMapping("/profileImage")
	public ResponseEntity<String> updateProfileImage(@RequestBody MultipartFile newImage) {
		try {
			Users user = usersService.selectByUserId(getUserIdFromSession(session));
			String newImageUrl = s3Service.updateProfileImage(newImage, user);
			return ResponseEntity.ok(newImageUrl);
		} catch (Exception e) {
			// 예외 발생 시 변경 실패 메시지 반환
			return ResponseEntity.ok("변경실패" + e.getMessage());
		}
	}
	
//	@PutMapping("/defaultImage")
//	public ResponseEntity<String> deleteProfileImage() {
//		s3Service.setDefaultImage(getUserIdFromSession(session));
//		
//		return ResponseEntity.ok("기본값으로 변경");
//	}
	
	@PutMapping("/defaultImage")
	public ResponseEntity<String> deleteProfileImage() {
		s3Service.setDefaultImage(getUserIdFromSession(session));
		
		String defaultUrl = "https://igojoa.s3.ap-northeast-2.amazonaws.com/default.jpg";
		
		return ResponseEntity.ok(defaultUrl);
	}

	/**
	 * session에서 유저아이디 가져오기
	 * 
	 * @param session
	 * @return 세션에 저장된 userId
	 */
	private String getUserIdFromSession(HttpSession session) {
		String userId = (String) session.getAttribute("userId");

		return userId;
	}

	/**
	 * SearchKeyword의 유무를 판별하여 SearchDto에 적당한 값을 넣는 메서드
	 * 
	 * @param userSearchDto
	 * @param userId
	 */
	private void handleSearchKeyword(UserSearchDto userSearchDto, String userId) {
	    // searchKeyword에 공백 및 특수문자도 검색할 수 있게 정규표현식으로 filtering
	    String searchKeyword = userSearchDto.getSearchKeyword();
	    if (searchKeyword == null) {
	        searchKeyword = "";
	    } else {
	        searchKeyword = searchKeyword.replaceAll("[^\\wㄱ-힣.]", "");
	    }
	    log.debug("키워드 = {}", searchKeyword);
	    
	    if (searchKeyword.trim().isEmpty()) {
	        userSearchDto.setSearchKeyword("");
	    } else {
	        userSearchDto.setUserId(getUserIdFromSession(session));
	        session.setAttribute("searchKeyword", searchKeyword);
	        userSearchDto.setSearchKeyword(searchKeyword);
	    }
	}

}
