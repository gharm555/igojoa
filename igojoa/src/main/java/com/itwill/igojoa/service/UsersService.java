package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.entity.Userss;
import com.itwill.igojoa.repository.UserssDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserssService {
	private final UserssDao UsersDao;

	public int create(Userss Users) {
		int result = UsersDao.create(Users);
		return result;
	}

	public Userss selectByUsersId(String UsersId) {
		return UsersDao.selectByUsersId(UsersId);
	}

	public Userss selectByIdAndPassword(Userss Users) {
		return UsersDao.selectByIdAndPassword(Users);
	}

}
