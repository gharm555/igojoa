package com.itwill.igojoa.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
import com.itwill.igojoa.dto.users.UserRelatedInfoDto;
import com.itwill.igojoa.dto.users.UserSearchDto;
import com.itwill.igojoa.dto.users.UserWrittenReviewsDto;
import com.itwill.igojoa.dto.users.UsersInfoDto;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.repository.UsersDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class UsersServiceTest {
	@Autowired
	private UsersService usersService;

}
