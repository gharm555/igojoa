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

	@Scheduled(fixedRate = 5000) // 5초마다 실행
	@Transactional
//	@Scheduled(cron = "0 0 */2 * * ?") // 2시간마다 매 정각에 실행
	public void runUpdatePlaceStatsJob() {
		log.debug("스케쥴러 가동");
		schedulerService.updatePlaceStats();
		log.debug("스케쥴러 정상 종료");
	}
	
	
//	@Transactional
//	@Scheduled(fixedRate = 5000)
//	public void runUpdateBestReviewsJob() {
//		log.debug("스케쥴러 가동");
//		schedulerService.updateBestReviews();
//		log.debug("스케쥴러 정상 종료");
//	}
}