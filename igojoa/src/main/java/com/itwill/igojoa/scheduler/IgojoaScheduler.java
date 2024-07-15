package com.itwill.igojoa.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.service.SchedulerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class IgojoaScheduler {

	@Autowired
	private SchedulerService schedulerService;

//	@Scheduled(fixedRate = 5000) // 5초마다 실행 테스트용
	@Transactional
//	@Scheduled(cron = "0 0 */2 * * ?") // 2시간마다 매 정각에 실행
	public void runUpdatePlaceStatsJob() {
		log.debug("스케쥴러 가동");
		schedulerService.updatePlaceStats();
		schedulerService.updateBestBadge();
		log.debug("스케쥴러 정상 종료");
	}

//	@Scheduled(fixedRate = 5000) // 5초마다 실행 테스트용
	@Transactional
	@Scheduled(cron = "0 10,30,50 * * * ?") // 매 시간의 10분, 30분, 50분에 실행
	public void runUpdateBestReviewsJob() {
		log.debug("스케쥴러 가동");
		schedulerService.updateBestReviews();
		schedulerService.deleteSynchronizeReviews();
		log.debug("스케쥴러 정상 종료");
	}
	
}