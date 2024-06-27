package com.itwill.igojoa.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.repository.PointsDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PointsService {
    private final PointsDao pointsDao;

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
}
