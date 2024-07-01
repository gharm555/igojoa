package com.itwill.igojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itwill.igojoa.dto.place.PlaceSpaceDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.entity.PlaceVerified;
import com.itwill.igojoa.entity.PlacesFavorite;
import com.itwill.igojoa.repository.PlaceDao;
import com.itwill.igojoa.repository.PlaceVerifiedDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlaceVerifiedService {
	private final PlaceVerifiedDao placeVerifiedDao;
	private final PlaceDao placeDao;

	public boolean verifyUserLocation(double userLatitude, double userLongitude, String userId) {
		List<PlaceSpaceDto> places = placeDao.selectPlaceSpaceList();
		for (PlaceSpaceDto place : places) {
			double placeLatitude = place.getPlaceLatitude();
			double placeLongitude = place.getPlaceLongitude();
			System.out.println(
					"Checking place: " + place.getPlaceName() + " at " + placeLatitude + ", " + placeLongitude);
			if (isWithin300Meters(userLatitude, userLongitude, placeLatitude, placeLongitude)) {
				String placeName = place.getPlaceName();
				System.out.println("User is within 300 meters of place: " + placeName);
				insertUserLocation(userLatitude, userLongitude, placeName, userId);
				return true;
			}
		}
		System.out.println("User is not within 300 meters of any place");
		return false;
	}

	private void insertUserLocation(double latitude, double longitude, String placeName, String userId) {
		PlaceVerified placeVerified = new PlaceVerified();
		placeVerified.setPlaceLatitude(latitude);
		placeVerified.setPlaceLongitude(longitude);
		placeVerified.setPlaceName(placeName);
		placeVerified.setUserId(userId);
		placeVerifiedDao.insert(placeVerified);
	}

	private boolean isWithin300Meters(double lat1, double lon1, double lat2, double lon2) {
		final int R = 6371; // 지구 반지름 (km)
		double latDistance = Math.toRadians(lat2 - lat1);
		double lonDistance = Math.toRadians(lon2 - lon1);
		double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.toRadians(lat1))
				* Math.cos(Math.toRadians(lat2)) * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		double distance = R * c * 1000; // 거리 (m)
		System.out.println("Calculated distance: " + distance + " meters");
		return distance <= 300;
	}

	@Transactional
	public int visitVerificationConfirmation(PlacesFavoriteDto placesFavoriteDto) {
		Optional<PlacesFavoriteDto> optionalPlacesFavorite = Optional.ofNullable(placesFavoriteDto);
		int res = 0;
		if (!optionalPlacesFavorite.isEmpty()) {
			placesFavoriteDto = optionalPlacesFavorite.get();
		} else {

			return res;
		}
		res = placeVerifiedDao.visitVerificationConfirmation(placesFavoriteDto);

		return res;
	}
}
