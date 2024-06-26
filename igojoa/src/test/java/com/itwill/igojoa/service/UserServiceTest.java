package com.itwill.igojoa.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.itwill.igojoa.entity.Userss;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class UsersServiceTest {
	@Autowired
	private UserssService UsersService;

    // @Test
    public void create() {
        Userss Users = Userss.builder().UsersId("asdhjzxcnbaus").password("test").email("zxcx").phoneNumber("as")
                .nickName("sssss")
                .build();
        int result = UsersService.create(Users);
        log.info("result: {}", result);
    }

    @Test
    public void selectByUsersId() {
        Userss Users = UsersService.selectByUsersId("asd");
        log.info("Users: {}", Users);
    }
}
