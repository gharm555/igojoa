package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.entity.User;
import com.itwill.igojoa.repository.UserDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
	private final UserDao userDao;

	public int create(User user) {
		return userDao.create(user);
	}

	public User selectByUserId(String userId) {
		return userDao.selectByUserId(userId);
	}

	public User selectByIdAndPassword(User user) {
		return userDao.selectByIdAndPassword(user);
	}

}
