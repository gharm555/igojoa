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
    public void getAllUserRelatedInfo() {
    	UserSearchDto userSearchDto = UserSearchDto.builder().userId("sangwontest2").build();
    	List<UserRelatedInfoDto> userRelatedInfoDto = usersService.getAllUserRelatedInfo(userSearchDto);
		List<UserFavoritePlacesDto> userFavoritePlacesDto = usersService.getUserFavoritePlaces(userSearchDto);
		List<UserFavoriteReviewsDto> userFavoriteReviewsDto = usersService.getUserFavoriteReviews(userSearchDto);
		List<UserWrittenReviewsDto> userWrittenReviewsDto = usersService.getUserWrittenReviews(userSearchDto);
		
		Map<String, Object> result = new HashMap<>();
		result.put("userRelatedInfo", userRelatedInfoDto);
		result.put("userFavoritePlaces", userFavoritePlacesDto);
		result.put("userFavoriteReviews", userFavoriteReviewsDto);
		result.put("userWrittenReviews", userWrittenReviewsDto);
    	
    	log.info("가져온정보 = {}", userRelatedInfoDto);
    }
    
//    @Test
//    public void searchUserFavoritePlaces() {
//    	UserSearchDto searchDto = UserSearchDto.builder()
//                .userId("sangwontest2")
//                .searchKeyword("뮤")
//                .startRowValue(0)
//                .rowCnt(3)
//                .build();
//        
//    	log.info("써치디티오 상태 = {}", searchDto);
//    	
//        List<UserFavoritePlacesDto> results = usersService.searchUserFavoritePlaces(searchDto);
//        
//        Assertions.assertNotNull(results);
//
//        log.info("가져온 정보 = {}", results);
//    }
    
}
