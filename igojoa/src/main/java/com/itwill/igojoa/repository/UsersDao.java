package com.itwill.igojoa.repository;

import com.itwill.igojoa.entity.Users;

public interface UsersDao {
    int create(Users user);

    Users selectByUserId(String userId);

    Users selectByIdAndPassword(Users user);

    void updateUserProfile(Users user);
}
