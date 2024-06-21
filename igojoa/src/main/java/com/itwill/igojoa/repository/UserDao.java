package com.itwill.igojoa.repository;

import com.itwill.igojoa.entity.User;

public interface UserDao {
    int create(User user);

    User selectById(String userId);
}
