package com.itwill.igojoa.repository;

import com.itwill.igojoa.entity.User;

public interface UserDao {
    int create(User user);

    User selectByUserId(String userId);

    User selectByIdAndPassword(User user);

    void updateUserProfile(User user);
}
