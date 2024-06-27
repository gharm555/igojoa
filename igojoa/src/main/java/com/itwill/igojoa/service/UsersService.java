package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.dto.users.UsersInfoDto;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.repository.UsersDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersService {
	// 대현 start
	private final UsersDao userDao;

	public int create(Users user) {
		int result = userDao.create(user);
		return result;
	}

	public Users selectByUserId(String userId) {
		return userDao.selectByUserId(userId);
	}

	public Users selectByIdAndPassword(Users user) {
		return userDao.selectByIdAndPassword(user);
	}
	// 대현 finish
	
	// 상원 start
	// 삭제필요? - 2024.06.26
//	public Users getProfileAndNickName(String userId) {
//		return userDao.getProfileAndNickName(userId);
//	}
	
	public Users getUserInfo(String userId) {
		return userDao.getUserInfo(userId);
	}
	// 상원 finish

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

}
