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
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class UserServiceTest {
	@Autowired
	private UserService userService;

<<<<<<< HEAD
//    @Test
	public void create() {
		User user = User.builder().userId("asasd123adsd").password("test").email("zxcx").phoneNumber("as")
				.nickName("sssss").build();
		int result = userService.create(user);
		log.info("result: {}", result);
	}

	@Test
	public void selectByUserId() {
		User user = userService.selectByUserId("asd");
		log.info("user: {}", user);
	}
=======
    // @Test
    public void create() {
        User user = User.builder().userId("asdhjzxcnbaus").password("test").email("zxcx").phoneNumber("as")
                .nickName("sssss")
                .build();
        int result = userService.create(user);
        log.info("result: {}", result);
    }

    @Test
    public void selectByUserId() {
        User user = userService.selectByUserId("asd");
        log.info("user: {}", user);
    }
>>>>>>> 7e6c2dc6b202324f01be89d666ae5674f9278996
}
