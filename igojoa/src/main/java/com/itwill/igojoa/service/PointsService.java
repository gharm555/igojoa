package com.itwill.igojoa.service;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
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

	public boolean addLoginPoints(String userId) {
		LocalDateTime lastLoginPointTime = pointsDao.getLastLoginPointTime(userId);
		LocalDateTime currentTime = LocalDateTime.now();
		LocalDateTime todayMidnight = currentTime.toLocalDate().atStartOfDay();

		if (lastLoginPointTime == null || lastLoginPointTime.isBefore(todayMidnight)) {
			int points = 300;
			System.out.println("로그인 포인트 적립 시도" + userId + " " + points);
			int updateCount = pointsDao.addLoginPoints(userId, points);
			System.out.println("addLoginPoints 실행 결과: " + updateCount);
			if (updateCount > 0) {
				int logInsertCount = pointsDao.insertPointLog(userId, "로그인", points);
				System.out.println("포인트 로그 삽입 결과" + logInsertCount);
				System.out.println("로그인 포인트 적립 성공" + userId + " " + points);
				return true;
			} else {
				System.out.println("로그인 포인트 적립 실패" + userId + " " + points);
			}
		} else {
			System.out.println("로그인 포인트 적립 실패 - 이미 적립된 경우" + userId);
		}

		return false;
	}

	// 포인트 로그 삽입
	public ResponseEntity<Integer> insertPointLog(String userId, String action, int points) {
		int updateCount = pointsDao.insertPointLog(userId, action, points);
		return updateCount > 0 ? ResponseEntity.ok(updateCount) : ResponseEntity.ok(0);
	}

	// 뽑기 시 포인트 차감
	public ResponseEntity<Integer> subtractPoints(String userId, int points) {
		if (pointsDao.getPointsByUserId(userId).getCurrentsPoints() >= points) {
			int updateCount = pointsDao.subtractPoints(userId, points);
			return updateCount > 0 ? ResponseEntity.ok(updateCount) : ResponseEntity.ok(0);
		} else {
			return ResponseEntity.ok(0);
		}
	}
}