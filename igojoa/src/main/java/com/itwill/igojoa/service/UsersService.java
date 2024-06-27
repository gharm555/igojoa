package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.repository.UsersDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersService {
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
