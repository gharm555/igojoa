package com.itwill.igojoa.repository;

import com.itwill.igojoa.entity.Points;

public interface PointsDao {
	Points getPointsByUserId(String userId);
}
