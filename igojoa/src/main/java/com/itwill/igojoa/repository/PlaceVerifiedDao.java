package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.entity.PlaceVerified;

public interface PlaceVerifiedDao {
	void insert(PlaceVerified placeVerified);

    List<PlaceVerified> findAll();

    int deletePlaceVerified(String userId);

    boolean existsTodayVerification(String userId, String placeName);

    int visitVerificationConfirmation(PlacesFavoriteDto placesFavoriteDto);
}
