package com.itwill.igojoa.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class PlaceServiceTest {
	@Autowired
	private PlaceService placeService;

	@Test
	public void showPlaceListTest() {
		log.debug("showPlaceListTest()");
		System.out.println(placeService.selectPlaceList());
	}
}
