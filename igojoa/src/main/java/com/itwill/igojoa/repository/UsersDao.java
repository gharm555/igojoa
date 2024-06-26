package com.itwill.igojoa.repository;

import com.itwill.igojoa.dto.users.UsersInfoDto;
import com.itwill.igojoa.entity.Users;

public interface UsersDao {
	// 대현 start
	int create(Users user);

	Users selectByUserId(String userId);

	Users selectByIdAndPassword(Users user);

	void updateUserProfile(Users user);
	// 대현 finish

	// 상원 start
	Users getUserInfo(String userId);

	// 삭제필요? - 2024.06.26
//    UsersInfoDto getUserInfo(String userId);
	// 상원 finish
}
