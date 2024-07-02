package com.itwill.igojoa.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.itwill.igojoa.dto.users.UserFavoritePlacesDto;
import com.itwill.igojoa.dto.users.UserFavoriteReviewsDto;
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

    // @Test
    public void create() {
        Users user = Users.builder().userId("asdhjzxcnbaus").password("test").email("zxcx").phoneNumber("as")
                .nickName("sssss")
                .build();
        int result = usersService.create(user);
        log.info("result: {}", result);
    }

//    @Test
    public void selectByUserId() {
        Users user = usersService.selectByUserId("asd");
        log.info("user: {}", user);
    }
    
//    @Test
    public void getUserFavoritePlaces() {
    	UserFavoritePlacesDto test = usersService.getUserFavoritePlaces("sangwontest2");
    	log.info("장소이름 = {}", test.getPlaceName());
    	log.info("장소주소 = {}", test.getAddress());
    	log.info("장소사진주소 = {}", test.getFirstUrl());
    	log.info("생성시간 = {}", test.getCreatedAt());
    }
    
    @Test
    public void getUserFavoriteReviews() {
    	UserFavoriteReviewsDto test = usersService.getUserFavoriteReviews("sangwontest2");
    	log.info("가져온정보 = {}", test);
    }
}
