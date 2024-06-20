package com.itwill.igojoa.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.itwill.igojoa.entity.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/application-context.xml"})
public class UserServiceTest {
    @Autowired
    private UserService userService;

     @Test
    public void create() {
        User user = User.builder().userId("123asd").password("zxc").email("asd").phoneNumber("123123").nickName("axdc")
                .build();
        int result = userService.create(user);
        log.info("result: {}", result);
    }

//    @Test
    public void selectById() {
        User user = userService.selectById("test2");
        log.info("user: {}", user);
    }
}
