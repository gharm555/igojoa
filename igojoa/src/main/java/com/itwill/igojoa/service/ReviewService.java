package com.itwill.igojoa.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.repository.ReviewDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewDao reviewDao;

	@Transactional
	public int insertReview() {
		return 0;
	}

}
