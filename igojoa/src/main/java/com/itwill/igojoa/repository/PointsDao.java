package com.itwill.igojoa.repository;

import java.time.LocalDateTime;

public interface PointsDao {
    // 회원가입시 points 테이블에 기본값으로 유저추가
    void addUser(String userId);

    // 사용자의 마지막 로그인 포인트 획득 시간을 조회
    LocalDateTime getLastLoginPointTime(String userId);

    // 포인트 로그를 추가
    int insertPointLog(String userId, String userActivity, int points);

    // 로그인 포인트 증가
    int addLoginPoints(String userId, int points);

}
