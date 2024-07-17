package com.itwill.igojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserSearchDto;
import com.itwill.igojoa.dto.users.UserVerifiedPlacesDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.dto.users.UsersInfoDto;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.repository.PlaceDao;
import com.itwill.igojoa.repository.PlaceVerifiedDao;
import com.itwill.igojoa.repository.PointsDao;
import com.itwill.igojoa.repository.ReviewDao;
import com.itwill.igojoa.repository.UsersDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersService {
	private final UsersDao userDao;
	private final PointsDao pointsDao;
	private final PlaceVerifiedDao placeVerifiedDao;
	private final ReviewDao reviewDao;
	private final PlaceDao placeDao;

	public int sessionTorF(String userId) {
		return userDao.sessionTorF(userId);
	}

	public int create(Users user) {
		int result = userDao.create(user);
		pointsDao.addUser(user.getUserId());
		return result;
	}

	public Users selectByUserId(String userId) {
		return userDao.selectByUserId(userId);
	}

	public Users selectByIdAndPassword(Users user) {
		return userDao.selectByIdAndPassword(user);
	}

	public UsersInfoDto getUserInfo(String userId) {
		return userDao.getUserInfo(userId);
	}

	public String findUserId(String email, String nickName) {
		return userDao.findUserId(email, nickName);
	}

	public boolean verifyUser(String userId, String email, String nickName) {
		return userDao.verifyUser(userId, email, nickName);
	}

	public int updatePassword(String userId, String password) {
		return userDao.updatePassword(userId, password);
	}

	public boolean checkUserId(String userId) {
		return userDao.checkUserId(userId);
	}

	public boolean checkNickName(String nickName) {
		return userDao.checkNickName(nickName);
	}

	public boolean checkEmail(String email) {
		return userDao.checkEmail(email);
	}

	public boolean checkPhoneNumber(String phoneNumber) {
		return userDao.checkPhoneNumber(phoneNumber);
	}

	public int deleteUser(String userId) {
		pointsDao.deletePoints(userId);
		pointsDao.deletePointsLog(userId);
		placeVerifiedDao.deletePlaceVerified(userId);
		reviewDao.deleteAllReview(userId);
		reviewDao.deleteAllReviewLike(userId);
		placeDao.deleteAllPlaceFavorite(userId);
		return userDao.deleteUser(userId);
	}

	public boolean updateUsers(Users user) {
		return userDao.updateUsers(user);
	}

	public List<UserRelatedInfoDto> getUserRelatedInfo(UserSearchDto userSearchDto) {
		return userDao.getUserRelatedInfo(userSearchDto);
	}

	public List<UserFavoritePlacesDto> getUserFavoritePlaces(UserSearchDto userSearchDto) {
		return userDao.getUserFavoritePlaces(userSearchDto);
	}

	public List<UserFavoriteReviewsDto> getUserFavoriteReviews(UserSearchDto userSearchDto) {
		return userDao.getUserFavoriteReviews(userSearchDto);
	}

	public List<UserWrittenReviewsDto> getUserWrittenReviews(UserSearchDto userSearchDto) {
		return userDao.getUserWrittenReviews(userSearchDto);
	}

	public List<UserVerifiedPlacesDto> getUserVerifiedPlaces(UserSearchDto userSearchDto) {
		return userDao.getUserVerifiedPlaces(userSearchDto);
	}
}