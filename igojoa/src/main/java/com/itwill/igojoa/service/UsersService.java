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

}
