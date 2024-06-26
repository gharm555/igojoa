package com.itwill.igojoa.repository;

import com.itwill.igojoa.entity.Userss;

public interface UserssDao {
    int create(Userss Users);

    Userss selectByUsersId(String UsersId);

    Userss selectByIdAndPassword(Userss Users);

    void updateUsersProfile(Userss Users);
}
