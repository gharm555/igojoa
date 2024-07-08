package com.itwill.igojoa.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itwill.igojoa.dto.points.UserLoggedDto;
import com.itwill.igojoa.dto.points.UserPointsDto;
import com.itwill.igojoa.dto.points.UserPointsQueryDto;
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

	// 위치 인증 시 포인트 적립
	public ResponseEntity<Integer> addPlaceVerifiedPoints(String userId) {
		int points = 1000;
		int updateCount = pointsDao.addLoginPoints(userId, points);
		log.debug("addPlaceVerifiedPoints 실행 결과: " + updateCount);
		return updateCount > 0 ? ResponseEntity.ok(updateCount) : ResponseEntity.ok(0);
	}

	// 포인트 로그 삽입
	public ResponseEntity<Integer> insertPointLog(String userId, String action, int points) {
		int updateCount = pointsDao.insertPointLog(userId, action, points);
		return updateCount > 0 ? ResponseEntity.ok(updateCount) : ResponseEntity.ok(0);
	}

	// 뽑기 시 포인트 차감
	public ResponseEntity<Integer> subtractPoints(String userId) {
		if (pointsDao.getPointsByUserId(userId).getCurrentsPoints() >= 150) {
			int updateCount = pointsDao.subtractPoints(userId);
			return updateCount > 0 ? ResponseEntity.ok(updateCount) : ResponseEntity.ok(0);
		} else {
			return ResponseEntity.ok(0);
		}
	}

	// 회원 탈퇴 시 포인트 삭제
	public int deletePoints(String userId) {
		return pointsDao.deletePoints(userId);
	}

	public int deletePointsLog(String userId) {
		return pointsDao.deletePointsLog(userId);
	}

	public String selectPoints(String userId) {
		return pointsDao.selectPoints(userId);
	}
	
	// 유저가 출석했는지 여부를 체크
	public List<UserLoggedDto> hasUserLogged(UserPointsQueryDto userPointsQueryDto) {
		return pointsDao.hasUserLogged(userPointsQueryDto);
	}
	
	// 유저가 월별 몇 점을 얻고 잃었는지 체크
	public UserPointsDto totalPointsGainedLost(UserPointsQueryDto userPointsQueryDto) {
		return pointsDao.totalPointsGainedLost(userPointsQueryDto);
	}
	
	// 유저가 해당 일에 했던 포인트 로그 가져오기
	public List<UserLoggedDto> dailyPointsLogs(UserPointsQueryDto userPointsQueryDto) {
		return pointsDao.dailyPointsLogs(userPointsQueryDto);
	}
}