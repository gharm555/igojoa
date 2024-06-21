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

    public User selectById(String userId) {
        return userDao.selectById(userId);
    }

}
