package com.itwill.igojoa.repository;

import com.itwill.igojoa.dto.points.UserLoggedDto;
import com.itwill.igojoa.dto.points.UserPointsDto;
import com.itwill.igojoa.dto.points.UserPointsQueryDto;
import com.itwill.igojoa.entity.Points;
import java.time.LocalDateTime;
import java.util.List;

public interface PointsDao {
    Points getPointsByUserId(String userId);

    // 회원가입시 points 테이블에 기본값으로 유저추가
    void addUser(String userId);

    // 사용자의 마지막 로그인 포인트 획득 시간을 조회
    LocalDateTime getLastLoginPointTime(String userId);

    // 포인트 로그를 추가
    int insertPointLog(String userId, String userActivity, int points);

    // 로그인 포인트 증가
    int addLoginPoints(String userId, int points);

    // 뽑기 포인트 차감
    int subtractPoints(String userId);

    // 회원 탈퇴 시 포인트 삭제
    int deletePoints(String userId);

    // 회원 탈퇴 시 포인트 로그 삭제
    int deletePointsLog(String userId);

    // 포인트 조회
    String selectPoints(String userId);
    
    // 유저가 출석했는지 여부를 체크
    List<UserLoggedDto> hasUserLogged(UserPointsQueryDto userPointsQueryDto);
    
    // 유저가 해당 월(혹은 일)에 몇 점을 얻고 잃었는지 체크
    UserPointsDto totalPointsGainedLost(UserPointsQueryDto userPointsQueryDto);
    
    // 유저가 해당 일에 했던 포인트 로그 가져오기
    List<UserLoggedDto> dailyPointsLogs(UserPointsQueryDto userPointsQueryDto);
}
