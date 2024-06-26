package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.entity.Points;
import com.itwill.igojoa.repository.PointsDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PointsService {
	private final PointsDao pointsDao;
	
	
	public Points getPointsByUserId(String userId) {
		log.debug("userId = {}", userId);
		return pointsDao.getPointsByUserId(userId);
	}
}
