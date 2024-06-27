package com.itwill.igojoa.repository;

import com.itwill.igojoa.entity.Users;

public interface UsersDao {
    int create(Users user);

    Users selectByUserId(String userId);

    Users selectByIdAndPassword(Users user);

    String findUserId(String email, String nickName);

    boolean verifyUser(String userId, String email, String nickName);

    int updatePassword(String userId, String password);
}
