package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.repository.SchedulerDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class SchedulerService {
	private final SchedulerDao schedulerDao;

	@Transactional
	public void updatePlaceStats() {
		log.debug("장소 데이터 집계 시작");
		schedulerDao.updatePlaceStats();
		log.debug("장소 데이터 집계 종료");
	}

	@Transactional
	public void updateBestReviews() {
		log.debug("베스트 리뷰 데이터 집계 시작");
		schedulerDao.updateBestReviews();
		log.debug("베스트 리뷰 데이터 집계 종료");
	}
	
	@Transactional
	public void updateBestBadge() {
		log.debug("베스트 뱃지 데이터 집계 시작");
		schedulerDao.updatePlaceStats();
		log.debug("베스트 뱃지 데이터 집계 종료");
	}
	
	@Transactional
	public void deleteSynchronizeReviews() {
		log.debug("삭제된 리뷰 추적 후 최적화 시작");
		schedulerDao.deleteSynchronizeReviews();
		log.debug("삭제된 리뷰 추적 후 최적화 종료");
	}
}
